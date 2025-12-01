---
title: Technical Guidelines for Slideshow Ingestion
date: 2025-12-01
author: Yahoo Content Ops
---

This document covers specifications for delivering slideshow content.

## **Format Specifications**

The following are the mandatory and optional tags. Any other field outside of this list will be ignored by the system. All these fields must be directly under \<item\>.

<div class="spec-table">

| Tag | Required | Description | Additional Comments |
| :---- | :---- | :---- | :---- |
| `<title>` | Yes | Headline of the article | Minimum word count is greater than 1 word |
| `<subheadline>` | No | A secondary headline providing additional context. | Minimum word count is greater than (1) word |
| `<description>` | Yes | Article summary | Do not include HTML in the description. "This is a short summary of the article, minimum word count is greater than (3) words." |
| `<guid>` | Yes | Unique identifier for the article |  |
| `<pubDate>` | Yes | Time at which the article is published in GMT | Example: \<pubDate\>Tue, 12 Dec 2022 05:49:08 \+0000\</pubDate\> |
| `<link>` | Yes | URL of the article. | This is the link of the article on your site. |
| `<category>` | Yes | Identifies the categories that the article belongs to. | One category per item/article. This field is a signal for our editors to identify content and for site distribution. |
| `<media:thumbnail>` | Yes | Thumbnail of image associated with the article. | The type can be ‘image/jpg’ or ‘image/png’ or ‘image/jpeg’ or ‘image/gif’. There can be only one thumbnail. Recommended image sizes are 1080 or 720 pixel height and 16:9 aspect ratio. |
| `<media:content>` | Yes | Images should be mentioned under \<media:content\> tags. | "The title of the image should be included under \<media:title\>, where as the description should be mentioned under \<media:description\>" |
| `<dc:creator>`, `<author>` | No | Author of the article | Articles with multiple authors please combine names within the same tag. Example: \<dc:creator\>Author1 and Author2\</dc:creator\> |

</div>

## **Sample**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:media="[http://search.yahoo.com/rss](http://search.yahoo.com/rss)" xmlns:content="[http://purl.org/rss/1.0/modules/content/](http://purl.org/rss/1.0/modules/content/)" version="2.0">
  <channel>
    <item>
      <title>
        <![CDATA[21 Zara winter coats to invest in before the cold weather hits]]>
      </title>
      <subheadline>
        <![CDATA[It's time for a new coat, so click to shop the 21 best outerwear options from Zara this season.]]>
      </subheadline>
      <description>
        <![CDATA[<p>The PERFECT work coat</p> <p><strong>You Might Also Like</strong><ul><li>
        <a href="[https://www.yahoo.com/beauty-hair/hair/reviews/g4870/best-hair-straighteners/?src=syn&dom](https://www.yahoo.com/beauty-hair/hair/reviews/g4870/best-hair-straighteners/?src=syn&dom)">
        A ranking of the very best hair straighteners - according to our Beauty Editors</a></li>
        <li><a href="[https://www.yahoo.com/fashion/style/g27912823/best-party-dresses/?src=syn&dom=yahuk](https://www.yahoo.com/fashion/style/g27912823/best-party-dresses/?src=syn&dom=yahuk)">
        Best party dresses to shop in the UK right now</a></li>
        <li><a href="[https://www.yahoo.com/beauty-hair/g27909218/net-a-porter-beauty-sale-shop/?src=syn&dom=yahuk](https://www.yahoo.com/beauty-hair/g27909218/net-a-porter-beauty-sale-shop/?src=syn&dom=yahuk)">
        11 products you'd be mad to miss from the Net A Porter beauty sale</a></li></ul></p>]]>
      </description>
      <guid isPermaLink="true">
        [http://www.yahoo.com/fashion/style/g4723/zara-winter-coats/](http://www.yahoo.com/fashion/style/g4723/zara-winter-coats/)
      </guid>
      <pubDate>Thu, 19 Sep 2019 08:24:00 +0000</pubDate>
      <link>
        [http://www.yahoo.com/fashion/style/g4723/zara-winter-coats/](http://www.yahoo.com/fashion/style/g4723/zara-winter-coats/)
      </link>
      <author>
        <![CDATA[ Sophie Leen ]]>
      </author>
      <category>
        <![CDATA[ Style ]]>
      </category>
      <media:content url="[https://www.yahoo.com/hmg-prod/images/zara-winter-coats-1568732140.jpg](https://www.yahoo.com/hmg-prod/images/zara-winter-coats-1568732140.jpg)" type="image/jpeg">
        <media:description type="html">
          <![CDATA[<p>Zara winter coats are a high street fashion institution, never failing to add style and
          (most importantly) warmth to your winter wardrobe. With that in mind, we've rounded up the 21 best Zara coats
          that will go with any outfit, and topping that they'll actually motivate you to leave the house on that -10ºc
          Monday morning commute. </p>]]>
        </media:description>
        <media:thumbnail url="[https://www.yahoo.com/hmg-prod/images/zara-winter-coats-1568732140.jpg](https://www.yahoo.com/hmg-prod/images/zara-winter-coats-1568732140.jpg)?fill=1%3A1%3Bauto%2Cauto&resize=100%3A%2A"/>
        <media:keywords>zara</media:keywords>
        <media:credit role="author">Courtesy</media:credit>
      </media:content>
      <media:content url="[https://www.yahoo.com/hmg-prod/images/zara-coats-suede-1567777550.jpg](https://www.yahoo.com/hmg-prod/images/zara-coats-suede-1567777550.jpg)?resize=%2A%3A1440" type="image/jpeg">
        <media:title type="html">
          <![CDATA[ Best Zara coats ]]>
        </media:title>
        <media:description type="html">
          <![CDATA[<p>Faux Suede coat, £29.99</p><p><a class="body-btn-link"
          href="[https://www.zara.com/uk/en/faux-suede-coat-p02712626.html?v1=13167447&v2=1281618](https://www.zara.com/uk/en/faux-suede-coat-p02712626.html?v1=13167447&v2=1281618)" target="_blank">
          BUY NOW</a></p>
          <p>So 70s. This will honestly be your best friend during that transitional-season-dressing-hell. </p>]]>
        </media:description>
        <media:thumbnail url="[https://www.yahoo.com/hmg-prod/images/zara-coats-suede-1567777550.jpg](https://www.yahoo.com/hmg-prod/images/zara-coats-suede-1567777550.jpg)?fill=1%3A1%3Bauto%2Cauto&resize=%2A%3A100"/>
        <media:keywords>zara</media:keywords>
        <media:credit role="author">Zara</media:credit>
      </media:content>
      <media:content url="[https://www.yahoo.com/hmg-prod/images/zara-coat-pastel-1567774909.jpg](https://www.yahoo.com/hmg-prod/images/zara-coat-pastel-1567774909.jpg)?resize=%2A%3A1440" type="image/jpeg">
        <media:title type="html">
          <![CDATA[ Best Zara coats ]]>
        </media:title>
        <media:description type="html">
          <![CDATA[<p>Coat with flap pockets, £95.99</p><p><a class="body-btn-link"
          href="[https://www.zara.com/uk/en/coat-with-flap-pockets-p04070221.html?v1=18274259&v2=1281618](https://www.zara.com/uk/en/coat-with-flap-pockets-p04070221.html?v1=18274259&v2=1281618)"
          target="_blank">BUY NOW</a></p><p>Pastel Green? Mint? Toothpaste? Whatever, it's beaut. </p>]]>
        </media:description>
        <media:thumbnail url="[https://www.yahoo.com/hmg-prod/images/zara-coat-pastel-1567774909.jpg](https://www.yahoo.com/hmg-prod/images/zara-coat-pastel-1567774909.jpg)?fill=1%3A1%3Bauto%2Cauto&resize=%2A%3A100"/>
        <media:keywords>zara</media:keywords>
        <media:credit role="author">Zara</media:credit>
      </media:content>
    </item>
  </channel>
</rss>

```
