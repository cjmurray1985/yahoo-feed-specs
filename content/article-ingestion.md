---
title: Technical Guidelines for Article Ingestion
author: Yahoo Content Ops
last_updated_override: ""
---

This document covers specifications for delivering article content.

## **Supported Content Types**

Yahoo supports the following variations:

* Plain Text Articles
* Articles with image/images
* Articles with video/videos
* Articles with slideshow/slideshows
* Articles with embedded product modules

## **Format Specifications**

Yahoo supports two types of formats: **XML** and **JSON**.

When using the XML (RSS) format, publishers can now embed product modules within their article content using the `<core-commerce>` tag.

## **XML Specifications**

| Tag | Required | Description | Additional Comments |
| :--- | :--- | :--- | :--- |
| `<title>` | Yes | Headline of the article | Minimum word count is greater than (1) word |
| `<subheadline>` | No | A secondary headline providing additional context. | Minimum word count is greater than (1) word |
| `<description>` | Yes | Short summary of the article | Minimum word count is greater than (3) words.<br>**Do not include HTML in the description.** |
| `<guid>` | Yes | Unique identifier for the article |  |
| `<pubDate>` | Yes | Time at which the article is originally published in GMT | Example: `<pubDate>Tue, 12 Dec 2022 05:49:08 +0000</pubDate>`<br>**This date should not change** |
| `<updated>` | Yes | Date and time when article was last updated | Example: `<updated>Fri, 22 Sep 2023 14:10:23 -0400</updated>`<br>For use when substantial updates are made to the article.<br>**Do not use for minor edits, such as a typo.** |
| `<link>` | Yes | URL of the article. | This is the link of the article on your site. |
| `<content:encoded>` | Yes | Full body of the article | This is the body of the article, minimum word count is greater than 150 words.<br>HTML markup or CDATA tags may be used, but HTML markup should not be used inside CDATA tags.<br>Normal punctuation can be used.<br>**You can not use HTML markup for your beginning and ending CDATA brackets**<br>`<![CDATA[` and `]]>` must be used.<br>Please reference the examples outlined in the Encoding Specifications section of the Welcome Kit. |
| `<core-commerce>` | No | Tag used to embed product modules within the article content. | This tag has specific required and optional attributes that define the product information and rendering.<br>Refer to the Encoding Specifications section of the Welcome Kit for detailed attribute specifications and usage.<br>Inclusion of these links are **expressly prohibited unless you have an affiliate commerce agreement** in place with Yahoo. |
| `<LinkedSlideshow>` | No | Related slideshow | Example: `<LinkedSlideshow>3000678196</LinkedSlideshow>`<br>This should reference the `<guid>` of the slideshow that has been sent through a separate MRSS feed (Refer to Technical guidelines for slideshow ingestion).<br>When placed outside `<content:encoded>`, it renders as a lead asset.<br>When placed inside `<content:encoded>`, it renders inline within the article body. |
| `<img src>` | Yes | The lead image of the article displayed at the top must be the first image | Inlined within the article’s body mentioned under `<content:encoded>`.<br>All additional images must be inlined within the text of the body of the article.<br>Partners must use `<figure>` / `<figcaption>` element to mark up a photo and display photo credits.<br>The “alt” attribute within the `<img src>` tag is highly encouraged to to include the descriptive caption of the images to meet accessibility standards. |
| `<media:thumbnail>` | Yes | Thumbnail image associated with the article. | The type can be `image/jpg`, `image/png`, `image/jpeg`, or `image/gif`.<br>Recommended image sizes are 1080 or 720 pixel height and 16:9 aspect ratio.<br>If no thumbnail image is provided, a thumbnail will be assigned from the first image within `<content:encoded>`.<br>**There can only be one thumbnail.** |
| `<category>` | Yes | Identifies the categories that the article belongs to. | Example: `<category>News</category>`<br>This field is a signal for our editors to identify content and for site distribution.<br>**One category per item/article.** |
| `<media:content>` | No | Images may be mentioned under `<media:content>` tags. The title of the image should be included under `<media:title>`, where as the description should be mentioned under `<media:description>` | This option **should only be used when there are no other images within the story body**, as embeds of any form within the story body are given precedence over the additional media.<br>The image sent as `<media:content>` will display as lead image without captioning on our sites when there are no embedded images.<br>To add a photo caption/credit to these images, please include a `<media:description>` tag nested in the `<media:content>` tag.<br>Please reference the Images in Content section of the Welcome Kit. |
| `<LinkedVideo>` | No | Related video. | Example:`<LinkedVideo>3000678195</LinkedVideo>`<br>This should reference the `<guid>` of the video that has been sent through a separate MRSS feed (Refer to Technical guidelines for video ingestion). |
| `<Metadata>` | No | Finance Tickers. Stock symbols of the companies referenced in the article. | There can be multiple tags each representing a ticker symbol.<br>Please reference the sample below under `**For Finance Partners**` to view a properly formatted `<Metadata>` tag. |
| `<dc:creator>`, `<author>` | No | Author of the article | For articles with multiple authors please combine both authors within the same tag.<br>Example: `<dc:creator>Author1 and Author2</dc:creator>` |
| `<locations>` | No | Location data can be provided by either city and state tags or latitude and longitude tags. | Partners should use latitude/longitude for better user experience. |

### **Core Commerce Tag Attributes**

When using the `<core-commerce>` tag within the `<content:encoded>` section, the following attributes are used to define product modules.

| Attribute | Required | Type | Description |
| :--- | :--- | :--- | :--- |
| `is-fed` | Yes | number | Must be 1 |
| `data-type` | Yes | string | Must be "product-list" |
| `product-url` | Yes | string | URL linking to the product |
| `price` | Yes | string | Can be numeric or non-numeric (e.g., "See", "$10/mo"). Currencies other than USD are currently not supported. |
| `merchant` | Yes | string | Name of the merchant |
| `product-name` | Yes | string | Name of the product |
| `editorial-text` | Yes | string | The body copy of the module. Supports a subset of HTML tags and requires proper encoding of quote marks. |
| `img-url` | Yes | string | URL of the product image. Aspect ratio should be **4:3**, with a minimum size of **400x300**. |
| `img-width` | Yes | number | Width of the product image |
| `img-height` | Yes | number | Height of the product image |
| `img-credit` | Yes | string | Credit for the product image |
| `superlative` | No | string | Optional tag or descriptor for the product |
| `pros` | No | string | Multiple pros should be separated by a `\|\|` |
| `cons` | No | string | Multiple cons should be separated by a `\|\|` |

#### **Implementation Notes**

*   **Rendering Logic:** If a required attribute is missing or null, the module will not render.
*   **Styling:** A hairline will automatically appear above a product module that immediately follows another product module.
*   **Monetization:** Link URLs within ingested product modules will not be automatically monetized (or re-monetized). Publishers should only use pre-monetized URLs in their product modules until further notice.

#### **Sample**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:media="[http://search.yahoo.com/rss](http://search.yahoo.com/rss)" xmlns:content="[http://purl.org/rss/1.0/modules/content/](http://purl.org/rss/1.0/modules/content/)" version="2.0">
  <channel>
    <title>Y! News</title>
    <link>[http://www.yahoo.com](http://www.yahoo.com)</link>
    <description>Yahoo.com -- First in business worldwide.</description>
    <pubDate>Tue, 12 Dec 2022 05:49:08 +0000</pubDate>
    <updated>Tue, 12 Dec 2022 06:59:08 +0000</updated>
    <item>
      <title>Easter holidays in chaos as airlines cancel more flights</title>
      <subheadline>EasyJet are expecting to cancel another 60 flights on Tuesday as Easter holiday travel chaos continues.</subheadline>
      <link>[https://www.yahooinc.co/business/2022/04/05/easter-holidays-chaos-arline-cancellations-last-days/](https://www.yahooinc.co/business/2022/04/05/easter-holidays-chaos-arline-cancellations-last-days/)</link>
      <description>Families are braced for further Easter travel chaos as YahooAir said it expected to cancel more flights in the coming days.</description>
      <pubDate>Tue, 05 Apr 2022 10:03:24 +0000</pubDate>
      <updated>Tue, 05 Apr 2022 11:23:25 +0000</updated>
      <guid isPermaLink="false">15dd860f-7a90-3416-bd3f-7aa183fd5a32</guid>
      <dc:creator>Luna Firebird</dc:creator>
      <content:encoded>
        <![CDATA[
          <figure>
            <img src="[https://www.yahooinc.co/content/_image-of-easter-airline-flight-schedule.jpeg](https://www.yahooinc.co/content/_image-of-easter-airline-flight-schedule.jpeg)" alt="flight cancellations causing chaos at airports - Getty">
            <figcaption>flight cancellations causing chaos at airports - Getty</figcaption>
          </figure>
          <p>Families are braced for <a href="[https://www.yahooinc.co/news/2022/04/04/airlines-cancel-200-flights-due-covid/](https://www.yahooinc.co/news/2022/04/04/airlines-cancel-200-flights-due-covid/)">further Easter travel chaos</a> as airlines expect to cancel more flights in the coming days.</p>
          <p>Travelers were this week facing hours-long queues at airports after a spate of flight cancellations, <a href="[https://www.yahooinc.co/business/2022/04/04/airlines-blame-bunnies-easter-travel-chaos/](https://www.yahooinc.co/business/2022/04/04/airlines-blame-bunnies-easter-travel-chaos/)">brought about by severe staff shortages.</a></p>
          <p>YahooAir is expected to cancel another 70 flights to and from the US today, following days of travel havoc across the country. More than 1,000 flights have been cancelled over the past week, according to data company Cyberdyne, compared to 197 the same week in 2019.</p>
          <p>Industry experts shared their insights on these developments.</p>

          <LinkedSlideshow>3000678196</LinkedSlideshow>
          
          <p>The company said preemptive cancellations would continue over the coming days at a "similar level" due to the ongoing high level of sickness.</p>
          <p>YahooAir warned that disruption was likely to extend over the Easter holidays.</p>
          <p>It said it would "operate the vast majority of its 1,525 flights today with a small proportion cancelled in advance to give customers the ability to rebook onto alternative flights".</p>
          <p>The company said preemptive cancellations would continue over the coming days at a "similar level" due to the ongoing high level of sickness.</p>
          <p>A spokesman added: "We are sorry for any inconvenience for affected customers."</p>
          <p>Passengers traveling on other airlines are also being hit by last-minute cancellations, with hundreds more flights expected to be wiped from schedules in the coming days.<strong> </strong>Airlines are blaming a surge in Covid cases for causing absences to double compared with their normal levels.</p>
          <p>It comes after many airlines sacked thousands of workers at the beginning of the pandemic, with insiders saying that lengthy wait-times for security checks on prospective staff were now delaying the recruitment of new employees.</p>
          <p>YahooAir has said that it has "sufficient operating crew and standby crew to manage normal levels of sickness".</p>
          <p>It added: "Unfortunately, high Covid infections across Europe have led to unusually high levels of crew sickness, more than double the normal rate."</p>

          <core-commerce
            is-fed="1"
            data-type="product-list"
            product-url="https://www.example.com/product/noise-cancelling-headphones"
            price="$299.99"
            merchant="SoundStore"
            product-name="Premium Noise-Cancelling Headphones"
            editorial-text="These noise-cancelling headphones are perfect for frequent travelers dealing with noisy airports and flights. They feature 30 hours of battery life and comfortable ear cushions for long trips."
            img-url="https://www.example.com/images/headphones.jpg"
            img-width="400"
            img-height="300"
            img-credit="SoundStore"
            superlative="Editor's Choice"
            pros="Superior noise cancellation||Comfortable for long flights||Long battery life"
            cons="Premium price point||Bulky case">
          </core-commerce>
          
          <p>Skynet Airways cut 115 of its journeys for Monday owing to staff shortages, and has reduced its schedule for the coming weeks. At least 98 flights which had been due to fly to or from Heathrow for Tuesday were cancelled.</p>
          <p>It said: "Aviation has been one of the industries worst hit by the pandemic and airlines and airports are experiencing the same issues rebuilding their operations while managing the continuing impact of Covid.</p>
          <p>“So while the vast majority of our flights continue to operate as planned, as a precaution we've slightly reduced our schedule between now and the end of May as we ramp back up.”</p>
          <p>Industry experts said this process to get airlines back up to full capacity could take some time. Charles Sommers, director of transport consultancy OCP Consulting, said it would be "very difficult" for many airlines for the next few months.</p>
          <p>Speaking to YAC's Wake Up To Money, Mr Sommers said: "I think certainly the next month or two are going to be very difficult."</p>
          <p>"We know that Karen has said that passengers should expect queues for one to two hours for the next several weeks while they undertake additional training."</p>
          <p>Consumer groups, meanwhile, criticized the lack of guidance for travelers, who are still being told to "arrive early" for flights, but are not being given any sense of how long they could be queuing.</p>
          <p>Oren Odellia, the travel editor at Which?, said: "Airports know how many passengers there will be each day and how many staff there are, roughly. They should give passengers a concrete time to the hour to arrive."</p>
        ]]>
      </content:encoded>
      <media:thumbnail url="[https://yoursite.com/v2web_thumbnail.jpg](https://yoursite.com/v2web_thumbnail.jpg)" height="1467" width="2200"/>
      <category>business</category>
      <locations>
        <location>
          <city>New York City</city>
          <state>New York</state>
          <latitude>40.730610</latitude>
          <longitude>-73.935242</longitude>
        </location>
        <location>
          <latitude>40.730610</latitude>
          <longitude>-73.935242</longitude>
        </location>
        <location>
          <city>New York City</city>
          <state>New York</state>
        </location>
      </locations>
      <LinkedVideo>3000678195</LinkedVideo>

      ***For Finance Partners***
      <Metadata>
        <MetaDataType FormalName="Securities Identifier"/>
        <Property FormalName="Ticker Symbol" Value="JPM"/>
        <Property FormalName="Exchange" Value="NYS"/>
      </Metadata>
      <Metadata>
        <MetaDataType FormalName="Securities Identifier"/>
        <Property FormalName="Ticker Symbol" Value="BAC"/>
        <Property FormalName="Exchange" Value="NYS"/>
      </Metadata>
      <Metadata>
        <MetaDataType FormalName="Securities Identifier"/>
        <Property FormalName="Ticker Symbol" Value="BARC"/>
        <Property FormalName="Exchange" Value="LSE"/>
      </Metadata>
    </item>
  </channel>
</rss>
```

## **JSON Specifications**

| Fields | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `guid` | String | Unique identifier for each article | Yes |
| `link` | String | Canonical URL of the article | Yes |
| `title` | String | Title of the article | Yes |
| `subheadline` | String | A secondary headline providing additional context. | No |
| `summary` | String | Description of the article | Yes |
| `content` | String | Full text of the article.<br><br>**Note:** To include **Inline** Linked Video or Slideshows, embed the `<LinkedVideo>GUID</LinkedVideo>` or `<LinkedSlideshow>GUID</LinkedSlideshow>` tags directly within this HTML string. | Yes |
| `author->name` | String | Article author name(s) | No |
| `published` | Date/Time (RFC822) | Date and time when article was originally published | Yes |
| `updated` | Date/Time (RFC822) | Date and time when article was last updated | Yes |
| `categories` | String (Array) | Category associated with the article | Yes |
| `Locations` | Array | List of location data can be provided by either city and state or latitude and longitude | No |
| `locations->city` | String |  | Yes ( only if location→state is populated) |
| `locations->state` | String |  | Yes ( only if location→city is populated) |
| `locations->latitude` | Float |  | Yes ( only if location→longitude is populated) |
| `locations→longitude` | Float |  | Yes ( only if location→latitude is populated) |
| `media` | Array of Objects | Each image/slideshow/video asset should be included in the media array.<br><br>**Note:** For **Lead** Linked assets, include the object with an id and type (see "Linked Media Objects" below). | No |

### **Linked Media Objects (Lead Assets)**

When defining a "Linked" video or slideshow as a **Lead Asset** (displayed at the top of the article), use the following object structure within the media array. This references the content GUID sent via separate MRSS feeds.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | The GUID of the video or slideshow from the MRSS feed. |
| `type` | String | Must be either "video" or "slideshow". |

#### **Sample**

```json
{
  "schema_version": "1.0",
  "title": "Your Feed",
  "description": "your feed in json format",
  "url": "[http://yourfeed.com/api](http://yourfeed.com/api)",
  "items": [
    {
      "guid": "20782083",
      "link": "[http://www.engadget.com/2013/12/05/china-warns-banks-against-dealing-in-bitcoin-btc](http://www.engadget.com/2013/12/05/china-warns-banks-against-dealing-in-bitcoin-btc)",
      "title": "China warns banks against using Bitcoin",
      "subheadline": "We're pretty sure no Government is entirely thrilled at the idea of Bitcoin, but China's now made its feelings very explicit.",
      "content": "<p class=\"image-container\" style=\"text-align: center;\"><a href=\"[http://www.engadget.com/2013/12/05/](http://www.engadget.com/2013/12/05/)\n china-warns-banks-against-dealing-in-bitcoin-btc/%SP_NCID%\"><img data-credit=\"AOL\" data-mep=\"46049\" \n src=\"[http://hss-prod.hss.aol.com/hss/storage/adam/70f462e25354d13a71c056728d8d3d4c/No-Bitcoin-Allowed.jpg](http://hss-prod.hss.aol.com/hss/storage/adam/70f462e25354d13a71c056728d8d3d4c/No-Bitcoin-Allowed.jpg)\" \n alt=\"\" /></a></p><p>We're pretty sure no Government is entirely thrilled at the idea of \n  <a href=\"[http://www.engadget.com/2013/05/08/engadget-primed-bitcoin/%SP_NCID](http://www.engadget.com/2013/05/08/engadget-primed-bitcoin/%SP_NCID)%\">Bitcoin</a>, but China's \n now made its feelings very explicit. The nation's various regulators have barred banks from dealing in the \n <a href=\"[http://www.engadget.com/2013/11/18/asrock-bitcoin-motherboards/%SP_NCID](http://www.engadget.com/2013/11/18/asrock-bitcoin-motherboards/%SP_NCID)%\">electronic currency</a>, \n saying that it doesn't have <a href=\"[http://www.engadget.com/2013/11/09/bitcoin-hijack-1-2-million/%SP_NCID](http://www.engadget.com/2013/11/09/bitcoin-hijack-1-2-million/%SP_NCID)%\">\n  legal status</a> and shouldn't be allowed to circulate in the market. While big institutions won't be able to \n  use the digital money, individuals are still entitled to buy and sell BTC off their own back. </p><LinkedVideo>3000678197</LinkedVideo><p>See the full slideshow of the timeline below:</p><LinkedSlideshow>3000678196</LinkedSlideshow>",
      "summary": "We're pretty sure no Government is entirely thrilled at the idea of Bitcoin, but China's now made \n  its feelings very explicit. The nation's various regulators have barred banks from dealing in the electronic \n currency, saying that it doesn't have ...",
      "author": {
        "name": "Daniel Cooper"
      },
      "published": "2019-06-11T09:45:25Z",
      "updated": "2019-06-11T20:32:38Z",
      "categories": [
        "Misc",
        "Bitcoin",
        "Money",
        "Finance",
        "Business",
        "@miscgadgets",
        "@livefyre",
        "China"
      ],
      "media": [
        {
          "provider": "VZM",
          "url": "[http://www.verizonmedia.com/c360364c-0439-4d2e-828f-ad7aed204a5c.jpg](http://www.verizonmedia.com/c360364c-0439-4d2e-828f-ad7aed204a5c.jpg)",
          "title": "Image title",
          "description": "some image of bitcoin mining",
          "credit": "AOL",
          "type": "image",
          "width": 200,
          "height": 200
        },
        {  
          "id": "3000678195",  
          "type": "slideshow"  
        }
      ],
      "locations": [
        {
          "city": "New York City",
          "state": "New York",
          "latitude": 40.730610,
          "longitude": -73.935242
        },
        {
          "city": "New York City",
          "state": "New York",
          "latitude": 40.730610,
          "longitude": -73.935242
        }
      ]
    }
  ]
}
```

### **Pagination**

Partners can also provide pagination for JSON format feeds. Pagination allows us to "go back in time" to ingest old content when necessary.

| Parameter | Description | Required |
| :--- | :--- | :--- |
| `start` | Unix timestamp in seconds | Y |
| `n` | Limits the number of items returned. Defaults to 50 | N |