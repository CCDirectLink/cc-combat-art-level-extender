sc.PartyMemberEntity.inject({
	startCombatArtCharging: function() {
		this.charging.level = 0;
		this.charging.max = Math.floor(Math.random() * 3) + 1;
		let activeAction = undefined;
		let currentAction = null;
		do {
			currentAction = sc.PLAYER_ACTION[this.currentCombatArt.actionKey + this.charging.max];
			activeAction = this.model.getAction(currentAction);
			if (this.params.currentSp < sc.PLAYER_SP_COST[this.charging.max - 1]) {
				activeAction = undefined;
			}
			if (activeAction == undefined) {
				this.charging.max = this.charging.max - 1;
			}
		} while (!activeAction && this.charging.max > 0);
		if (!activeAction) {
			return;
		}
		this.setCurrentAnim("charge", false, null, true);
		this.animationFixed = true;
		this.timer.action = -1;
		const artName = this.model.getCombatArtName(currentAction);
		if (artName && sc.options.get("party-combat-arts") != sc.PARTY_COMBAT_ARTS.NONE) {
			const artDisplayBox = new sc.SmallEntityBox(this, artName, 1);
			artDisplayBox.stopRumble();
			ig.gui.addGuiElement(artDisplayBox)
		}
		this.doCombatArtCharge();
	}
});