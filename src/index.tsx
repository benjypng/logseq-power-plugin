import "@logseq/libs";
import { callSettings } from "./callSettings";
import { oohYeah } from "./oohYeah";
import { lightItUpBaby } from "./utils/thor";
import { callStyle } from "./style";

let count = 0;
let combo = 0;

// Credits: https://stackoverflow.com/a/8126515/14728340
function Timer(fn: Function, t: number) {
  var timerObj = setInterval(fn, t);

  this.stop = function () {
    if (timerObj) {
      clearInterval(timerObj);
      count = 0;
      timerObj = null;
    }
    return this;
  };

  // start timer using current settings (if it's not already running)
  this.start = function () {
    if (!timerObj) {
      this.stop();
      timerObj = setInterval(fn, t);
    }
    return this;
  };

  // start with new or original interval, stop current interval
  this.reset = function (newT = t) {
    t = newT;
    return this.stop().start();
  };
}

const main = () => {
  console.log("logseq-power-plugin loaded");

  callStyle();
  callSettings();

  logseq.updateSettings({
    powerMode: false,
  });

  const powerTimer = new Timer(() => {
    count = count + 1;
    top.document.getElementById("powerMode").classList.remove("comboChange");
    if (count === parseInt(logseq.settings.coolingOff)) {
      logseq.App.showMsg("Chain broke", "warning");
      count = 0;
      combo = 0;
      top.document.getElementById("powerMode").innerHTML = `CHAIN BROKE`;
    }
  }, 1000);
  powerTimer.stop();

  let cursorPosition: any = null;
  //@ts-expect-error
  const observer = new top.MutationObserver((mutations: MutationRecordType) => {
    oohYeah(powerTimer, cursorPosition, mutations);
    combo = combo + 1;
    top.document.getElementById("powerMode").classList.add("comboChange");
    top.document.getElementById("powerMode").innerHTML = combo.toString();

    // Lightning strikes when it hits multiples of combo
    if ((combo / logseq.settings.lightningCombos) % 1 === 0) {
      logseq.App.showMsg("GODLIKE", "success");
      lightItUpBaby();
    }
  });

  logseq.provideModel({
    trigger() {
      const { powerMode } = logseq.settings;

      if (!powerMode) {
        logseq.updateSettings({
          powerMode: true,
        });

        logseq.App.showMsg("Power mode turned ON", "success");
        top.document.getElementById("powerMode").innerHTML = `START TYPING`;
        powerTimer.start();

        observer.observe(
          top?.document.querySelector(".cp__sidebar-main-content"),
          {
            characterData: true,
            childList: true,
            subtree: true,
          }
        );
      } else {
        logseq.updateSettings({
          powerMode: false,
        });

        logseq.App.showMsg("Power mode turned OFF", "success");
        powerTimer.stop();

        observer.disconnect();

        top.document
          .getElementById("powerMode")
          .classList.remove("comboChange");
        top.document.getElementById("powerMode").classList.add("combo");
        top.document.getElementById("powerMode").innerHTML = `POWER MODE`;
      }
    },
  });

  logseq.App.registerUIItem("toolbar", {
    key: "logseq-powerMode-plugin",
    template: `<div class="combo" id="powerMode" data-on-click="trigger">POWER MODE</div>`,
  });
};

logseq.ready(main).catch(console.error);
