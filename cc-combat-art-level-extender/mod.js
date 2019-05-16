function init() {
	sc.PartyMemberEntity.prototype.startCombatArtCharging = function() {
		this.charging.level = 0;
		this.charging.max = Math.floor(Math.random() * 3) + 1;
		var a = undefined;
		do {
			a = this.model.getAction(sc.PLAYER_ACTION[this.currentCombatArt.actionKey + this.charging.max]);
			if (this.params.currentSp < sc.PLAYER_SP_COST[this.charging.max - 1]) {
				a = undefined;
			}
			if (a == undefined) {
				this.charging.max = this.charging.max - 1;
			}
		} while (!a && this.charging.max > 0);
		if (!a) {
			return;
		}
		this.setCurrentAnim("charge", false, null, true);
		this.animationFixed = true;
		this.timer.action = -1;
		if (a && sc.options.get("party-combat-arts") != sc.PARTY_COMBAT_ARTS.NONE) {
			a = new sc.SmallEntityBox(this, a.toString(), 1);
			a.stopRumble();
			ig.gui.addGuiElement(a)
		}
		this.doCombatArtCharge();
	};
}

document.body.addEventListener('modsLoaded', init);