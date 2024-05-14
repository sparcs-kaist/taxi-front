/** {@link https://developers.channel.io/docs/web-installation} */

class ChannelService {
  constructor() {
    this.loadScript();
  }
  loadScript() {
    const w = window;
    if (w.ChannelIO) return;
    const ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      const x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === "complete") {
      l();
    } else if (window.attachEvent) {
      window.attachEvent("onload", l);
    } else {
      window.addEventListener("DOMContentLoaded", l, false);
      window.addEventListener("load", l, false);
    }
  }
  boot(settings) {
    window.ChannelIO("boot", settings);
  }
  updateUser(options) {
    window.ChannelIO("updateUser", options);
  }
  openChat(message) {
    window.ChannelIO("openChat", undefined, message);
  }
  shutdown() {
    window.ChannelIO("shutdown");
  }
  showMessenger() {
    window.ChannelIO("showMessenger");
  }
}

export default new ChannelService();
