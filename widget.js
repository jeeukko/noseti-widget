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

	function main() {
		jQuery(document).ready(function($) {
			$("<link>", {
				rel: "stylesheet",
				type: "text/css",
				href: "https://cdn.nope.fi/noseti/latest/widget.css"
			}).appendTo("head");

			$("div.noseti-container").each(function() {
				var container = this;

				$.getJSON("https://thingspeak.com/channels/" + $(container).attr("data-channel") + "/feed.json", function(data) {
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

					$("<progress>", {
						max: size,
						value: (size - free),
						class: "noseti-bar"
					}).appendTo(container);
				});
			});
		});
	}
})();
