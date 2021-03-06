(function() {
	var jQuery;

	if (window.jQuery === undefined || window.jQuery.fn.jquery !== "3.1.1") {
		var jQuery_tag = document.createElement("script");
		jQuery_tag.setAttribute("type","text/javascript");
		jQuery_tag.setAttribute("src", "https://code.jquery.com/jquery-3.1.1.min.js");
		jQuery_tag.onload = function() {
			jQuery = window.jQuery.noConflict(true);
			main();
		};
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jQuery_tag);
	} else {
		jQuery = window.jQuery;
		main();
	}

	function get_args() {
		var script_tag = document.getElementById("noseti-script");
		var query = script_tag.src.replace(/^[^\?]+\??/, "");
		var vars = query.split("&");
		var args = {};
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			args[pair[0]] = decodeURI(pair[1]).replace(/\+/g, " ");
		}
		return args;
	}

	function main() {
		jQuery(document).ready(function($) {
			var args = get_args();
			$("<link>", {
				rel: "stylesheet",
				type: "text/css",
				href: "https://cdn.nope.fi/noseti/latest/widget.css?key=" + args.key
			}).appendTo("head");

			$("div.noseti-container").each(function() {
				var container = this;

				$.getJSON("https://thingspeak.com/channels/" + $(container).attr("data-channel") + "/feed.json", function(data) {
					if ($(container).attr("data-type") == "disk") { // DISKSPACE
						var latest = data.feeds[data.feeds.length - 1];
						var free = latest[$(container).attr("data-freefield")];
						var size = latest[$(container).attr("data-sizefield")];

						$("<span>", {
							text: $(container).attr("data-title"),
							class: "noseti-text left"
						}).appendTo(container);
						$("<span>", {
							text: (size - free) + " GB / " + size + " GB",
							class: "noseti-text right"
						}).appendTo(container);

						$("<meter>", {
							min: 0,
							max: size,
							value: (size - free),
							low: 0,
							high: (size - free),
							class: "noseti-bar disk"
						}).appendTo(container);
					} else if ($(container).attr("data-type") == "temp") { // TEMPERATURE
						var latest = data.feeds[data.feeds.length - 1];
						var temp = latest[$(container).attr("data-tempfield")];

						$("<span>", {
							text: $(container).attr("data-title"),
							class: "noseti-text left"
						}).appendTo(container);
						$("<span>", {
							text: temp + " °C",
							class: "noseti-text right"
						}).appendTo(container);

						$("<meter>", {
							min: -50,
							max: 50,
							value: temp,
							low: -50,
							high: 50,
							class: "noseti-bar temp"
						}).appendTo(container);
					} else if ($(container).attr("data-type") == "uptime") { // UPTIME
						var field = $(container).attr("data-uptimefield");
						var latest = data.feeds[data.feeds.length - 1];
						var uptime = latest[field];
						var maxuptime = 0;

						for (var i in data.feeds) {
							var num = parseInt(data.feeds[i][field], 10) || 0;
							if (num > maxuptime) {
								maxuptime = num;
							}
						}

						$("<span>", {
							text: $(container).attr("data-title"),
							class: "noseti-text left"
						}).appendTo(container);
						$("<span>", {
							text: uptime + " Days | Record: " + maxuptime + " Days",
							class: "noseti-text right"
						}).appendTo(container);

						$("<meter>", {
							min: 0,
							max: maxuptime,
							value: uptime,
							low: 0,
							high: maxuptime,
							class: "noseti-bar uptime"
						}).appendTo(container);
					} else if ($(container).attr("data-type") == "pctemp") { // PC TEMPERATURE
						var latest = data.feeds[data.feeds.length - 1];
						var temp = latest[$(container).attr("data-tempfield")];

						$("<span>", {
							text: $(container).attr("data-title"),
							class: "noseti-text left"
						}).appendTo(container);
						$("<span>", {
							text: temp + " °C",
							class: "noseti-text right"
						}).appendTo(container);

						$("<meter>", {
							min: 0,
							max: 100,
							value: temp,
							low: 0,
							high: 100,
							class: "noseti-bar pctemp"
						}).appendTo(container);
					}
				});
			});
		});
	}
})();
