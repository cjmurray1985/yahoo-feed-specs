---
title: Content Ingestion Welcome Kit
author: Yahoo Content Ops
last_updated_override: ""
---

Follow our technical requirements to build a feed that renders all of its embedded features. Yahoo reserves the right to update these guidelines at its sole discretion at any time. For questions, please reach out to your partner manager.

## **Supported Acquisition Protocols**

* All feeds (both metadata and assets) must be available through HTTPS.
* All media assets will be downloaded (and in the case for videos, transcoded) to Yahoo servers.
* All other previously supported protocols (FTP, FTPS, SFTP) are deprecated and should not be used for new onboarding.

## **Supported Feed Formats**

* All feeds must be served through RSS, MRSS or API.
* Article feeds must conform to XML 1.0 specification or JSON format.
* Please validate your RSS feed and fix any issues using a feed validation tool before submitting to Yahoo.

The following character encoding and namespace declaration is required:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:media="[http://search.yahoo.com/rss](http://search.yahoo.com/rss)" xmlns:content="[http://purl.org/rss/1.0/modules/content/](http://purl.org/rss/1.0/modules/content/)" version="2.0">
```

* Feed fetch frequency is every 5 minutes, up to 100 new articles/videos per fetch.
* Please only include recent articles in your feeds (chronological order) that matches the up to date freshness of the content on your site.
* All other previously supported feed formats (NewsML, ATOM and custom XML) are deprecated and cannot be used for new onboarding.

## **Supported Content Type**

Yahoo supports three different types of content:

1. [Technical guidelines for article ingestion](/docs/article-ingestion)
2. [Technical guidelines for slideshow ingestion](/docs/slideshow-ingestion)
3. [Technical guidelines for video ingestion](/docs/video-ingestion)

Please contact us if the technical guideline you are seeking is not available.

## **Content Security**

* For security reasons, Yahoo prohibits content from publishers that contain `<script>`, inline styles (`<style>` tags or `style=""`) attributes and `<object>` markups.
* All embed (`<embed>` or `<iframe>`) tags must be served via HTTPS. Yahoo pages are served through HTTPS.
* Failure to provide HTTPS will result in removal of content from front end pages and therefore unavailable to end users

## **Supported Feed Authentication Types**

Partners/Publishers, who are concerned about content security, can allow domains, thus enabling our systems to access the content. Please contact us for the list of IPs.

Yahoo also supports secure feeds with the following types of authentication:

* OAuth2
* Basic (username/password)
* API Header (X-Token)

## **Date & Time Specifications**

Below is the required format for publishing date/time. Date/time must include time-zone information.

| Date and Time Pattern | Example |
| ----- | ----- |
| `"EEE, d MMM yyyy HH:mm:ss Z"` | `<pubDate>Tue, 15 Feb 2022 17:58:16 +0000</pubDate>` |

**Note:**

* Each article must include a timestamp of when the article was originally published.
* The timestamp cannot be dated in the future.
* Content embargo and expiry will be as dictated by license.
* Content can include embargo and expiry overrides through `<dcterms:valid>` tag.

## **Auto Updates in Content**

* By default our ingestion system will auto detect changes to the `<title>` (headline), `<description>` (summary) or `<content:encoded>` (body of the story).
* To make updates to a previously ingested story already in our system please resend the changes through the RSS feed.
* The updated version MUST contain the same `<guid>` as the original piece.
* If the updated version has a new `<guid>`, we will process it as a new story and generate a new url, which means the previous version will not be updated.
* Failure to use the same `<guid>` will create duplicative content. Do NOT make changes to the `<pubDate>`.
* Doing so can negatively impact user content streams.
* Please include the `<updated>` tag when changing image assets in `<media:thumbnail>` and `<media:content>` fields.

### **Example workflow:**

**Original**

```xml
<item>
  <title>Amazon slashes prices of its Fire smartphone</title>
  <link>[https://yoursite.com/news/amazon-slashes-prices-fire-smartphone.html](https://yoursite.com/news/amazon-slashes-prices-fire-smartphone.html)</link>
  <description>Amazon slashed the price of its Fire smartphone Monday, a day before Apple is expected to unveil its latest version of the iPhone.</description>
  <pubDate>Tue, 15 Feb 2022 18:58:16 +0000</pubDate>
  <guid>4835eb2d-52f9-48c7-af38-80959f1bbb12</guid>
  ...
</item>
```

**Updated version with title text change**

```xml
<item>
  <title>Amazon slashes prices of its Fire smartphone price to 99 cents ahead of Apple's new iPhone announcement</title>
  <link>[https://yoursite.com/news/amazon-slashes-prices-fire-smartphone.html](https://yoursite.com/news/amazon-slashes-prices-fire-smartphone.html)</link>
  <description>Amazon slashed the price of its Fire smartphone Monday, a day before Apple is expected to unveil its latest version of the new iPhone 7.</description>
  <pubDate>Tue, 15 Feb 2022 18:58:16 +0000</pubDate>
  <updated>Tue, 15 Feb 2022 19:00:23 +0000</updated>
  <guid>4835eb2d-52f9-48c7-af38-80959f1bbb12</guid>
  ...
</item>
```

## **Encoding Specifications**

There are two ways in which content can be encoded. HTML markup may be used or CDATA tags may be used. HTML markup should not be used inside CDATA tags. Normal punctuation can be used. You can not use HTML markup for your beginning and ending CDATA brackets. `<![CDATA[` and `]]>` must be used. Please reference the examples below.

When encoding content for the `<core-commerce>` tag, proper encoding of HTML within the `editorial-text` attribute is required. This includes encoding quote marks and other special characters to ensure proper rendering. The same encoding principles apply to the `pros` and `cons` attributes where multiple items should be separated by "||" (e.g., "Visually arresting||Increases reader confidence").

1. **Encode through `<!CDATA[....]]>`**

```xml
<content:encoded>
  <![CDATA[
    <p style="">When Bungie's shared-world shooter <a href="[https://www.gamespot.com/destiny/#ftag=YHF6738a5f](https://www.gamespot.com/destiny/#ftag=YHF6738a5f)" data-ref-id="false">Destiny</a> launches on<a href="htts://[www.gamespot.com/articles/bungie-announces-destiny-release-date-delays-beta/110-94/#ftag=YHF6738a5f](https://www.gamespot.com/articles/bungie-announces-destiny-release-date-delays-beta/110-94/#ftag=YHF6738a5f)" data-ref-id="1100-6416594"> September 9</a>, players will not be able to trade items with other players, the developer has confirmed. "Nope," Bungie <a href="[https://www.bungie.net/7_Bungie-Weekly-Update-08014/en/News/News?aid=154#ftag=YHF6738a5f](https://www.bungie.net/7_Bungie-Weekly-Update-08014/en/News/News?aid=154#ftag=YHF6738a5f)" rel="nofollow" data-ref-id="false">writes on its website</a>. "We want you to earn 'em. You should be able to tell a awesome story for every sweet jewel in your arsenal."</p>
  ]]>
</content:encoded>
```

2. **Encode through HTML encoding. HTML must be escaped.**

```xml
<content:encoded>
  &lt;p style=&quot;&quot;&gt;When Bungie&#39;s shared-world shooter &lt;a href=&quot;[https://www.gamespot.com/destiny/#ftag=YHF6738a5f&quot](https://www.gamespot.com/destiny/#ftag=YHF6738a5f&quot); data-ref-id=&quot;false&quot;&gt;Destiny&lt;/a&gt; launches on&lt;a href=&quot;[https://www.gamespot.com/articles/announces-destiny-release-date-delays-beta/1/#ftag=YHF8a5f&quot](https://www.gamespot.com/articles/announces-destiny-release-date-delays-beta/1/#ftag=YHF8a5f&quot); data-ref-id=&quot;1100-6416594&quot;&gt; September 9&lt;/a&gt;, players will not be able to trade items with other players, the developer has confirmed. &quot;Nope,&quot;Bungie &lt;a href=&quot;[https://www.bungie.net/7_Bungie-Weekly-Update---08222014/en/News/News?aid=12054#ftag=YHF8a5f&quot](https://www.bungie.net/7_Bungie-Weekly-Update---08222014/en/News/News?aid=12054#ftag=YHF8a5f&quot); rel=&quot;nofollow&quot; data-ref-id=&quot;false&quot;&gt;writes on its website&lt;/a&gt;. &quot;We want you to earn &#39;em. You should be able to tell a awesome story for every sweet jewel in your arsenal.&quot;&lt;/p&gt;
</content:encoded>
```

## **HTML Tags Specifications**

The following are the only allowed tags. Any other tag will be filtered out (including `<script>` and `<meta>`)

| Tag | Description |
| ----- | ----- |
| `<a\>` | Anchor |
| `<b\>` | Bold Text |
| `<blockquote\>` | Long Quotation |
| `<br\>` | Line Break |
| `<em\>` | Emphasized Text |
| `<h1\>` to `<h6\>` | HTML Headings |
| `<i\>` | Italics |
| `<img\>` | Image Reference |
| `<li\>` | List item |
| `<ol\>` | Ordered List |
| `<ul\>` | Unordered List |
| `<p\>` | Paragraph |
| `<strong\>` | Emphasis |
| `<iframe\>` | HTML frame. |
| `<embed\>` | Typically used for social embeds or YouTube videos |
| `<sub\>` | Subscript |
| `<sup\>` | Superscript |
| `<pre\>` | Pre-formatted \- all spaces and newlines within the tag will be rendered as is |
| `<figure\>` / `<figcaption\>` | Figure element to mark up a photo in a document |
| `<section\>` | Section in a document |
| `<span\>` | Span element used to color a part of a text |
| `<table\>` | To draw a table |
| `<tr\>` & `<th\>` | Table rows and Table Headlines |
| `<core-commerce>` | Native product module |

## **Content Quality Requirements**

The following are Yahoo’s minimum content quality word count standards. If an article fails to meet minimum word counts it will be automatically blocked and not made available to users.

| Field | Minimum Words |
| ----- | ----- |
| **\<title\>** | 1 |
| **\<description\>** (Short summary of the article) | 3 |
| **\<content:encoded\>** (Body of the article) | 150 |
| (Article Body with embedded video) | 150 |

## **Links in Content**

* **Licensor Links and Other Attribution:** In general, Licensor is granted an allowance for links directed to relevant content as long as those links do not point to advertising or marketing content.  
  * Please refer to the terms of your Content License Agreement for specifics on what is allowed under your contract.  
* **Affiliate/Commerce Links:** Inclusion of these links are expressly prohibited unless you have an affiliate commerce agreement in place with Yahoo.  
  * Please reach out to your Partner Manager/Business Development representative to discuss further.  
  * Optionally, use the athena-button class to style links as native commerce buttons.  
  * Example HTML: `<a class="athena-button" href="[offer-url]">Get It!</a>`  
  * The product-url attribute and any links within the editorial-text attribute of a `<core-commerce>` tag should use pre-monetized URLs (URLs with affiliate tracking parameters) as they will not be automatically monetized by Yahoo. All other general guidelines for links apply.
* **Finance Links (Company Stock Symbols):** When linking a company's stock symbol, link to the Yahoo Quote Summary Page.  
  * Any stock symbol sent linked via the RSS feed must link to the Yahoo QSP.  
  * Example HTML: `<a> href="https://finance.yahoo.com/quote/UPS/">UPS</a>`

## **Media In Content**

### **Images In Content**

* Images should be high res and as small as possible in k size. No image should be larger than 5MB.  
* Images that large should be avoided as it will cause slow loading. At minimum, images should be 1280x720.

There are two ways, through which images can be associated with an article.

#### **Inlined within the article body using `<img>` tags (within `<content:encoded>`)**

* This first method is preferred and will ensure the images have the appropriate captioning if included in the image tag.  
* For embedded image to show in the lead position, the image must be included as the first element in the article body.  
* It is required to add “caption” (using `<figure>` / `<figcaption>`) as shown below.  
* Inclusion of the “alt” attribute is highly recommended to meet accessibility standards within the image specifications.

```xml
<content:encoded>
  <![CDATA[
    <figure>
      <img src="[https://www.yahooinc.co/content/_image-of-easter-airline-flight-schedule.jpeg](https://www.yahooinc.co/content/_image-of-easter-airline-flight-schedule.jpeg)" alt="Flight cancellations causing chaos at airports - Getty">
      <figcaption>Flight cancellations causing chaos at airports - Getty</figcaption>
    </figure>
  ]]>
</content:encoded>
```

#### **Through separate tags in the RSS (`<media:content>`)**

* This option should only be used when there are no other images within the story body, as embeds of any form within the story body are given precedence over the additional media.  
* The image sent as `<media:content>` will display as lead image without captioning on our sites when there are no embedded images.  
* To add a photo caption/credit to these images, please include a `<media:description>` tag nested in the `<media:content>` tag.

```xml
<item>
  …
  <media:content url="[https://yoursite.com/thumbnails/image/2016/12/21/13/media-war.jpg](https://yoursite.com/thumbnails/image/2016/12/21/13/media-war.jpg)" type="image/jpeg"/>
  <media:descripton>image caption goes here - Credit: image credit goes here</media:descripton>
  …
</item>
```

**Note: Finance Newswire partners only** For client logos, please send a 400x400 image (or a factor thereof 800x800, etc...) on a white background as the first element in the article body. Failure to meet this requirement will result in an incorrectly sized or missing thumbnail logo on ticker profile pages.

### **Video Only**

Provide a MRSS video feed that meets the requirements outlined in the [Technical guidelines for video ingestion documentation](/docs/video-ingestion). The videos will be downloaded, transcoded and served from Yahoo's servers. The video will render in a Yahoo player on a dedicated video page with brief text description.

### **Video In Article Content**

Publishers can embed video in article content using one of two options.

#### **Option 1: Linked Video**

Is a two part process.

* **Step 1:** Provide a video feed as outlined above. Videos will be downloaded, transcoded and served from Yahoo servers.
* **Step 2:** Provide an article feed that the meets the requirements outlined in the [Technical guidelines for article ingestion documentation](/docs/article-ingestion).

You now have the option to use the `<LinkedVideo>` tag to identify the existing video asset in our system.

Publishers can position videos as either:

* **Lead assets:** Place the `<LinkedVideo>` tag outside `<content:encoded>` to display as the primary media at the top of the article.
* **Inline content:** Place the `<LinkedVideo>` tag inside `<content:encoded>` to embed within the article body.

**Lead asset Video:**

```xml
<item>
  <title>Breaking News Story</title>
  <LinkedVideo>3000678194</LinkedVideo>
  <content:encoded>
    <![CDATA[Article content here...]]>
  </content:encoded>
</item>
```

**Inline Video:**

```xml
<content:encoded>
  <![CDATA[
    <p>The story continues below.</p>
    <LinkedVideo>3000678194</LinkedVideo>
    <p>More details about the event...</p>
  ]]>
</content:encoded>
```

#### **Option 2: Iframe Embed**

The second video in article option is to use `<iframe>` tags. Youtube is currently the only approved video sharing site.

**YouTube Embed:**

```xml
<content:encoded>
  <p> ... <iframe width="560" height="315" src="[https://www.youtube.com/embed/Kc-n3D_Kp-8](https://www.youtube.com/embed/Kc-n3D_Kp-8)" frameborder="0" allowfullscreen></iframe> ...</p>
</content:encoded>
```

### **Slideshows In Content**

Publishers can embed slideshows as lead assets or inline within article content using the `<LinkedSlideshow>` tag. Publishers must provide a separate slideshow feed through MRSS. The slideshows will be downloaded and served from Yahoo's servers. Once a slideshow feed has been successfully onboarded. You now have the option to link slideshows to articles using a `<LinkedSlideshow>` tag.

Publishers can position slideshows as either:

* **Lead assets :** Place the `<LinkedSlideshow>` tag outside `<content:encoded>` to display as the primary media at the top of the article  
* **Inline content :** Place the `<LinkedSlideshow>` tag inside `<content:encoded>` to embed within the article body

To get more information on how to provide slideshow feeds to Yahoo, please refer to the document [Technical guidelines for slideshow ingestion](/docs/slideshow-ingestion).

**Lead Asset Slideshow:**

```xml
<item>
  <title>Fashion Week Highlights</title>
  <LinkedSlideshow>3000678195</LinkedSlideshow>
  <content:encoded>
    <![CDATA[Article content here...]]>
  </content:encoded>
</item>
```

**Inline Slideshow:**

```xml
<content:encoded>
  <![CDATA[
    <p>The spring fashion week showcased bold new directions from established designers.</p>
    <LinkedSlideshow>3000678197</LinkedSlideshow>
    <p>Several emerging designers also made impressive debuts with innovative collections.</p>
  ]]>
</content:encoded>
```

The slideshow will render based on its placement \- as a lead asset when outside `<content:encoded>` or inline when placed within the article content.

## **Social Embeds In Content**

Embeds supported in `<content:encoded>` are:

* [Youtube](/docs/welcome-kit#youtube-embed)
* [Instagram](/docs/welcome-kit#instagram-embed)
* [X (Twitter)](/docs/welcome-kit#twitter-embed)
* [Facebook](/docs/welcome-kit#facebook-embed)
* [Threads](/docs/welcome-kit#threads-embed)
* [TikTok](/docs/welcome-kit#tiktok-embed)

* [BlueSky](/docs/welcome-kit#bluesky-embed)
* [Datawrapper](/docs/welcome-kit#datawrapper-embed)
* [Flourish](/docs/welcome-kit#flourish-embed)


### **YouTube Embed**

```html
<iframe width="560" height="315" src="[https://www.youtube.com/embed/2zTkBgHNsWM](https://www.youtube.com/embed/2zTkBgHNsWM)" frameborder="0" allowfullscreen></iframe>
```

### **Instagram Embed**

```html
<blockquote class="instagram-media" data-instgrm-captioned="" data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
  <p style=" margin:8px 0 0 0; padding:0 4px;">
    <a data-cke-saved-href="[https://www.instagram.com/p/BENWRutGBDJ/](https://www.instagram.com/p/BENWRutGBDJ/)" href="[https://www.instagram.com/p/BENWRutGBDJ/](https://www.instagram.com/p/BENWRutGBDJ/)" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">When your piece of art by @inslee finally makes her appearance in the guest room. Welcome home, beauty.</a>
  </p>
  <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by Meghan Markle (@meghanmarkle) on <time datetime="2022-04-15T05:06:36+00:00" style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;">Apr 14, 2022 at 10:06pm PDT</time></p>
</blockquote>
```

### **X (Twitter) Embed**

```html
<blockquote class="twitter-tweet" data-lang="en">
  <p dir="ltr" lang="en">Dear Phillip Hammond <br><br>Inflation is above 3% because I cut Bank Rate and added £60 billion to QE in August 2016. <br><br>All the best. <br><br>Mark Carney<br>Governor of the Bank of England<br>B45 0HF Birmingham</p>
  —Shaun Richards (@notayesmansecon) <a href="[https://twitter.com/notayesmansecon/status/92?ref_src=twsrc%5Etfw](https://twitter.com/notayesmansecon/status/92?ref_src=twsrc%5Etfw)">December 12, 2022</a>
</blockquote>
```

### **Facebook Embed**

#### iframe

```html
<iframe allowtransparency="true" frameborder="0" height="714" scrolling="no" src="[https://www.facebook.com/plugins/post.php](https://www.facebook.com/plugins/post.php)?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D1017447%26set%3Da.6563697.214.213%26type%3D3&amp;width=500" style="border:none;overflow:hidden" width="500"></iframe>
```

#### div

```html
<div id="fb-root"></div>
<script async="1" defer="1" crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v24.0"></script><div class="fb-video" data-href="https://www.facebook.com/watch/?v=835321340249928" data-app-id="887156172104257"></div>
```

### **Threads Embed**

```html
<blockquote class="text-post-media" data-text-post-permalink="[https://www.threads.net/@yahoonews/post/DCzcQKLxWLN](https://www.threads.net/@yahoonews/post/DCzcQKLxWLN)"
data-text-post-version="0" id="ig-tp-DCzcQKLxWLN" style=" background:#FFF; border-width: 1px; border-style: solid;
border-color: #00000026; border-radius: 16px; max-width:540px; margin: 1px; min-width:270px; padding:0;
width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
<a href="[https://www.threads.net/@yahoonews/post/DCzcQKLxWLN](https://www.threads.net/@yahoonews/post/DCzcQKLxWLN)" style=" background:#FFFFFF; line-height:0;
padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont,
sans-serif;" target="_blank"> <div style=" padding: 40px; display: flex; flex-direction: column; align-items:
center;"><div style=" display:block; height:32px; width:32px; padding-bottom:20px;"> <svg aria-label="Threads"
height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"> <path d="M141.537
88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484
44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116
63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932
64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145
81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224
144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834
117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501
158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355
139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11
97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037
64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695
0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13
96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569
192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776
103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232
107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939
99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" /></svg></div><div style=" font-size:
15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div></div></a></blockquote>
<script async src="[https://www.threads.net/embed.js](https://www.threads.net/embed.js)"></script>
```

### **TikTok Embed**

```html
<blockquote class="tiktok-embed" cite="[https://www.tiktok.com/@yahoosports/video/7268336795056704814](https://www.tiktok.com/@yahoosports/video/7268336795056704814)"
data-video-id="7268336795056704814" style="max-width: 605px;min-width: 325px;" > <section>
<a target="_blank" title="@yahoosports" href="[https://www.tiktok.com/@yahoosports?refer=embed](https://www.tiktok.com/@yahoosports?refer=embed)">@yahoosports</a>
Could you recite this play back to your teammates in the huddle? 🤔 <a title="nfl" target="_blank"
href="[https://www.tiktok.com/tag/nfl?refer=embed](https://www.tiktok.com/tag/nfl?refer=embed)">#NFL</a> <a title="miamidolphins" target="_blank"
href="[https://www.tiktok.com/tag/miamidolphins?refer=embed](https://www.tiktok.com/tag/miamidolphins?refer=embed)">#MiamiDolphins</a> <a title="finsup" target="_blank"
href="[https://www.tiktok.com/tag/finsup?refer=embed](https://www.tiktok.com/tag/finsup?refer=embed)">#FinsUp</a> <a title="dolphins" target="_blank"
href="[https://www.tiktok.com/tag/dolphins?refer=embed](https://www.tiktok.com/tag/dolphins?refer=embed)">#Dolphins</a> <a title="miami" target="_blank"
href="[https://www.tiktok.com/tag/miami?refer=embed](https://www.tiktok.com/tag/miami?refer=embed)">#Miami</a> <a title="football" target="_blank"
href="[https://www.tiktok.com/tag/football?refer=embed](https://www.tiktok.com/tag/football?refer=embed)">#football</a> <a title="tua" target="_blank"
href="[https://www.tiktok.com/tag/tua?refer=embed](https://www.tiktok.com/tag/tua?refer=embed)">#Tua</a> <a target="_blank" title="♬ original sound - Yahoo"
href="[https://www.tiktok.com/music/original-sound-7268336801079741230?refer=embed](https://www.tiktok.com/music/original-sound-7268336801079741230?refer=embed)">♬ original sound - Yahoo</a>
</section> </blockquote>
```



### **Bluesky Embed**

```html
<blockquote class="bluesky-embed"
data-bluesky-uri="at://did:plc:xlqcxpk53spbhlypj6wmvvke/app.bsky.feed.post/3lbclfv5ors2l"
data-bluesky-cid="bafyreihnv4uclmbdkonzz7t7lpckg25ykfmagpjrvde6lqouxh32hz3e7a">
<p lang="en">Bluesky has surpassed a milestone of 20 MILLION users.<br><br>
<a href="[https://bsky.app/profile/did:plc:xlqcxpk53spbhlypj6wmvvke/post/3lbclfv5ors2l?ref_src=embed](https://bsky.app/profile/did:plc:xlqcxpk53spbhlypj6wmvvke/post/3lbclfv5ors2l?ref_src=embed) ">
[image or embed]</a></p> — Pop Base
(<a href="[https://bsky.app/profile/did:plc:xlqcxpk53spbhlypj6wmvvke?ref_src=embed](https://bsky.app/profile/did:plc:xlqcxpk53spbhlypj6wmvvke?ref_src=embed) ">@popbase.tv</a>)
<a href="[https://bsky.app/profile/did:plc:xlqcxpk53spbhlypj6wmvvke/post/3lbclfv5ors2l?ref_src=embed](https://bsky.app/profile/did:plc:xlqcxpk53spbhlypj6wmvvke/post/3lbclfv5ors2l?ref_src=embed) ">
November 19, 2024 at 8:52 AM</a>
</blockquote>
<script async src="[https://embed.bsky.app/static/embed.js](https://embed.bsky.app/static/embed.js)" charset="utf-8"></script>
```

### **Datawrapper Embed**

```html
<iframe title="Global CO2 emissions by fuel and industry" aria-label="d3-area / title" id="datawrapper-chart-9oMjE" src="https://datawrapper.dwcdn.net/9oMjE/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="400" data-external="1"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r,i=0;r=e[i];i++)if(r.contentWindow===a.source){var d=a.data["datawrapper-height"][t]+"px";r.style.height=d}}});</script>
```

### **Flourish Embed**

```html
<div style="left: 0; width: 100%; height: 575px; position: relative;"><iframe src="https://flo.uri.sh/visualisation/15666009/embed" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div>
```

## **SEO Recommendations**

Search engines are increasingly improving their ability to detect the original source of a story. There are however some actions that you as a content provider can take to ensure you are facilitating the process of flagging your original story as the canonical source. Note that Yahoo does not support canonical tags to providers as Yahoo reserves the right to generate organic traffic with provider content on the yahoo.com domain. Yahoo has no intention to outrank the original source, however ideally appearing \#2 after content provider.

**Please follow these best practices to ensure your partner content performs optimally:**

* Ensure the article is published first on your site before feeding it to Yahoo. If it’s not, the Yahoo version could be seen as the original version.
* Ensure only one article is published per story. If any updates are made to the story, do so using the same URL. Updating on a separate URL can confuse the search engine to which of the versions should be used. Yahoo will in most cases de-duplicate updates to one single static URL, so if this is not done by the provider, Yahoo version might outrank the provider.
* Ensure you are using the preferred title `<title>` before publishing the story. If you publish the story with one title, feed it to Yahoo and later update the title on the story on your site, the two articles can be seen as separate if the titles varies a lot, and the Yahoo version can be surfaced for the initial title instead of your original article.
* For content containing `<core-commerce>` product modules, maintain consistent product information between your site and the Yahoo feed to avoid search engine confusion. Product modules should complement rather than duplicate existing product pages, as search engines may penalize duplicate content.

**Example:**

* At Publication  
  * Provider: “Title 1” Yahoo version: “Title 1”  
* After publication, provider updates title of article with substantially different title without feeding new version to Yahoo.  
* After Publication  
  * Provider: “Title 1” Yahoo version: “Title 2”  
* This would likely result in Yahoo ranking for ‘Title 1’ string, with provider not included first 10 results, and provider ranking for ‘Title 2’.

**Notes and Considerations**

* SERPs (Search Engine Result Page) will vary depending on your personalized results (clicking on Yahoo Tech while logged into Google is a signal that you want more Yahoo Tech content)  
* SERPs will vary depending on location, browser, device and many other factors beyond Yahoo’s control or agreements.  
* Yahoo will always endeavor to ensure partners maintain search engine visibility  
* If your content is included in Google News, the article is likely to be featured in the news module in web search if available, which would mean that the article is not repeated in the web search part of the results page.  
* This would be considered an acceptable search engine result page.