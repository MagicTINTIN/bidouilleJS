String.prototype.bepoDecode = function (decode) {
    console.log(this);
    const bepokb = " \"«»()@+-/*=%bépoè^vdljzwçauie,ctsrnmàyx.k'qghf1234567890°`BÉPOÈ!VDLJZWÇAUIE;CTSRNMÀYX:K?QGHF";
    const azerty = " &é\"'(-è_çà)=azertyuiop^$*qsdfghjklmùwxcvbn,;:!1234567890°+AZERTYUIOP\"£µQSDFGHJKLM%WXCVBN?./§"
    let newString = "";
    if (decode) {
        for (const c of this) {
            newString += azerty.charAt(bepokb.indexOf(c));
        }
            
    }
    else {
        for (const c of this) {
            newString += bepokb.charAt(azerty.indexOf(c));
        }
    }
    return newString;
};