function init() {
	sc[entries.partyMemberEntity].prototype[entries.doCombatArtChargeUp] = function() {
		this[entries.specialArtConfig][entries.specialArtLevel] = 0;
		this[entries.specialArtConfig].max = Math.floor(Math.random() * 3) + 1;
		var a = undefined;
		do {
			a = this[entries.partyModelInstance][entries.getSpecialArtName](sc[entries.COMBAT_ACTIONS][this[entries.currentSpecialArt][entries.specialArtName] + this[entries.specialArtConfig].max]);
			if (this[entries.param][entries.sp] < ig[entries.Event][entries.resolveVariable](sc[entries.SP_COST_ARR][this[entries.specialArtConfig].max - 1])) {
				a = undefined;
			}
			if (a == undefined) {
				this[entries.specialArtConfig].max = this[entries.specialArtConfig].max - 1;
			}
		} while (!a && this[entries.specialArtConfig].max > 0);
		if (!a) {
			return;
		}
		this[entries.SHOW_ANIMATION]("charge",
			x, r, h);
		this[entries.freezeAnimation] = h;
		this[entries.timeDuration].action = -1;
		if (a && sc.options.get("party-combat-arts") != sc[entries.PARTY_COMBAT_ART_VIEW].NONE) {
			a = new sc[entries.MINI_HOVER_TEXTBOX](this, a.toString(), 1);
			a[entries.setVibrationTime]();
			ig[entries.GUI][entries.addGui](a)
		}
		this[entries.playCombatArtChargeSound]()
	};
}

document.body.addEventListener('modsLoaded', init);