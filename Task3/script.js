window.onload = async function() {
    const feedbackList = document.getElementById("feedback-list");

    try {
        // Fetch data from all platforms
        const twitterData = await fetchTwitterData();
        const facebookData = await fetchFacebookData();
        const instagramData = await fetchInstagramData();

        // Combine data from all platforms
        const allFeedback = [...twitterData, ...facebookData, ...instagramData];

        // Display feedback on the dashboard
        renderFeedback(allFeedback, feedbackList);
    } catch (error) {
        console.error('Error fetching data:', error);
        feedbackList.textContent = 'Error fetching data. Please try again later.';
    }
};

async function fetchTwitterData() {
    // Fetch data from Twitter API
    const response = await fetch('https://api.twitter.com/2/tweets', {
        headers: {
            'Authorization': 'Bearer YOUR_TWITTER_BEARER_TOKEN'
        }
    });
    const data = await response.json();
    // Process and return data from Twitter API
    return data;
}

async function fetchFacebookData() {
    // Fetch data from Facebook Graph API
    // You need to obtain a user access token with appropriate permissions
    const accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN';
    const response = await fetch(`https://graph.facebook.com/v12.0/me/feed?access_token=${accessToken}`);
    const data = await response.json();
    // Process and return data from Facebook API
    return data.data.map(post => ({ platform: "Facebook", text: post.message }));
}

async function fetchInstagramData() {
    // Fetch data from Instagram Graph API
    // You need to obtain a user access token with appropriate permissions
    const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`);
    const data = await response.json();
    // Process and return data from Instagram API
    return data.data.map(media => ({ platform: "Instagram", text: media.caption }));
}

function renderFeedback(feedbackData, feedbackList) {
    feedbackData.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.platform}: ${item.text}`;
        feedbackList.appendChild(li);
    });
}
