---
title: Technical Guidelines for Video Ingestion
date: 2025-12-01
author: Yahoo Content Ops
---

This document covers specifications for delivering video content.

## **Feed Specifications**

The following are the mandatory and optional tags. Any other field outside of this list will be ignored by the system. All these tags must be directly under \<item\>.

<div class="spec-table">

| Tag | Required | Description | Additional Comments |
| :---- | :---- | :---- | :---- |
| `<title>` | Yes | Headline of the video | Minimum word count is greater than (1) word |
| `<subheadline>` | No | A secondary headline providing additional context. | Minimum word count is greater than (1) word |
| `<description>` | Yes | Summary of the video | Do not include HTML in the description. |
| `<guid>` | Yes | Unique identifier for the video. | "If the video is related to an article that is sent through a separate RSS feed, this video guid must be included in \<LinkedVideo\> tag of the specified article." |
| `<pubDate>` | Yes | Time at which the video is published in GMT. | Example: \<pubDate\>Tue, 12 Dec 2022 05:49:08 \+0000\</pubDate\> |
| `<updated>` | Yes | Date and time when article was last updated | For use when substantial updates are made to the article. "Do not use for minor edits, such as a typo." Example: \<updated\>Tue, 12 Dec 2022 06:59:08 \+0000\</updated\> |
| `<link>` | No | URL of the video | This is the link to the landing page on your site. It will be used for the canonical url. Do not use this field if you do not have a user-facing landing page hosted on your domain. |
| `<category>` | Yes | Identifies which category the video belongs to. | One category per item/article. This field is a signal for our editors to identify content and for site distribution. Example: \<category\>News\</category\> |
| `<media:content type="video">` | Yes | Link from where video is to be downloaded along with other specifications. There can be only one \<media:content\> element inside \<item\> except if it is inside \<media:group\>. | For more details refer section on \<media:content\> |
| `<media:thumbnail>` or `<media:content type="image">` | Yes | Thumbnail of the video. ‘type’ is mandatory and needs to be ‘image/jpg’ or ’image/png’ or ‘image/gif’. |  |
| `<dc:creator>` or `<author>` | No | Author of the Video. |  |
| `<media:group>` | No | Allows grouping of \<media:content\> elements that are effectively same content, yet different representations . | Most notably to differentiate different bit rates. Please ensure the first media:content url within the media:group is the highest quality video asset. |
| `<media:keywords>` | No | Highly relevant keywords or tags that describe the video. | Maximum of 10 words and should be comma delimited. |
| `<media:credit>` | No | Captures the credits for the video (e.g., producer). |  |
| `<dcterms:valid>` | No | Embargo and expiry of the video. | Should contain start and end dates. Dates and times should be constructed according to the W3C Date and Time Formats Specification. |
| `<media:subTitle type="application/ttml+xml" lang="en-US" href="http://media.zenfs.com/community-sample.ttml" />` | No | type, lang and href are mandatory. | For more details refer section on Closed Caption |
| `<show>` | No | TV Show details | Season,Episode,Season Name,Sample: \<show season="1" episode="2"\>\<\!\[CDATA\[Saturday Night Live\]\]\>\</show\> |

</div>

## **Sample Feed**

```xml
<?xml version="1.0"?>
<rss xmlns:media="[https://search.yahoo.com/mrss/](https://search.yahoo.com/mrss/)" xmlns:dcterms="[http://purl.org/dc/terms/](http://purl.org/dc/terms/)" version="2.0">
  <channel>
    <title>Crazy Videos</title>
    <link>[https://yoursite.com/channels/crazyvideos](https://yoursite.com/channels/crazyvideos)</link>
    <description>Footage of strange things around the world</description>
    <pubDate>Tue, 12 Dec 2022 05:49:08 +0000</pubDate>
    <updated>Tue, 12 Dec 2022 06:59:08 +0000</updated>
    <item>
      <guid>9f1d9756e9397ea</guid>
      <title>UFO Sighted Over South Hong Kong</title>
      <subheadline>EasyJet are expecting to cancel another 60 flights on Tuesday as Easter holiday travel chaos continues.</subheadline>
      <link>[https://yoursite.com/v2web](https://yoursite.com/v2web)</link>
      <description>A 10-year old kid sighted a circular object and called her father who captured this. Is this army experimenting with a new device or really a visit from outer space?</description>
      <pubDate>Tue, 12 Dec 2022 05:49:08 +0000</pubDate>
      <updated>Tue, 12 Dec 2022 06:59:08 +0000</updated>
      <category>Entertainment</category>
      <media:content type="video/mp4" medium="video" url="[https://yoursite.com/v2web.mp4](https://yoursite.com/v2web.mp4)" isDefault="true"/>
      <media:thumbnail url="[https://yoursite.com/v2web_thumbnail.jpeg](https://yoursite.com/v2web_thumbnail.jpeg)"/>
      <media:keywords>UFO, family, kids</media:keywords>
      <media:credit role="author">Eric Wayman</media:credit>
      <dcterms:valid>start=Tue, 12 Dec 2022 05:49:08 +0000;end=Fri, 15 Aug 2023 10:17:13 +0000;</dcterms:valid>
      <show season="1" episode="2">Sunday Night Live</show>
      <media:subTitle type="application/ttml+xml" lang="en-US" href="[http://media.zenfs.com/community-sample.ttml](http://media.zenfs.com/community-sample.ttml)"/>
    </item>
    <item>
      ...
    </item>
  </channel>
</rss>

```

\<media:content\> is a sub-element of either \<item\> or \<media:group\>. Media objects that are not the same content should not be included in the same \<media:group\> element. The sequence of these items implies the order of presentation.

```xml
<media:content
  type="video/mp4"
  medium="video"
  url="[https://yoursite.com/v2web.mp4](https://yoursite.com/v2web.mp4)"
  isDefault="true"
  bitrate="1200"/>

```

*   
  url= should specify the direct URL to the media object.  
* fileSize= is the number of bytes of the media object. It is an optional attribute.  
* type= is the standard MIME type of the object. It is an optional attribute.  
* medium= is the type of object (image | audio | video | document | executable). This should be video always for the content under discussion.  
* isDefault= determines if this is the default object that should be used for the \<media:group\>. There should only be one default object per \<media:group\>. It is an optional attribute.  
* bitrate= is the kilobits per second rate of media. It is an optional attribute.

### **Video Specifications**

### **Formats**

| Format | Specifications |
| :---- | :---- |
| **High Definition QuickTime (MOV)** | Horizontal Video Dimensions: 1920x1080 or 1280x720 |
|  | Horizontal Video Aspect Ratio: 16x9 |
|  | Vertical Video Dimensions 1080x1920 or 720x1280 |
|  | Vertical Video Aspect Ratio: 9x16 |
|  | Square Video Dimensions: 1080x1080 |
|  | Square Video Aspect Ratio: 1x1 |
|  | Video Frame Rate: 23.98, 24, 25, 29.97, 30 or 59.94 |
|  | Video Scanning Method: Progressive preferred, Interlaced accepted for 1080i |
|  | Video Codec Preferred (others available upon discussion) |
|  | H.264 (6mbps or higher) |
|  | ProRes |
|  | ProRes (HQ) |
|  | DVCProHD |
|  | Audio: Stereo; 48khz or 44.1khz; 8, 16 or 24 bit |
|  | Audio Codec Preferred: |
|  | PCM Uncompressed (Little or Big Endian) |
|  | AAC \- 128kbps or higher |
| **High Definition(MP4)** | Video Dimensions: 1920x1080 or 1280x720 |
|  | Video Aspect Ratio: 16x9 |
|  | Vertical Video Dimensions 1080x1920 or 720x1280 |
|  | Vertical Video Aspect Ratio: 9x16 |
|  | Square Video Dimensions: 1080x1080 |
|  | Square Video Aspect Ratio: 1x1 |
|  | Video Frame Rate: 23.98, 24, 25, 29.97, 30 or 59.94 |
|  | Video Scanning Method: Progressive preferred, Interlaced accepted for 1080i |
|  | Video Codec Preferred (others available upon discussion) |
|  | H.264 (6mbps or higher) |
|  | MPEG-4 Simple Profile (6mbps or higher) |
|  | Audio: Stereo; 48khz or 44.1khz |
|  | Audio Codec Preferred: |
|  | AAC \- 128kbps or higher |

### **Preferred Bit Rate**

| Type | Video Bit Rate (kbps) | Mono Audio Bit Rate (kbps) | Stereo Audio Bit Rate (kbps) |
| :---- | :---- | :---- | :---- |
| 1080p | 4000 | 128 | 384 |
| 720p | 3000 | 128 | 384 |
| 540p | 1500 | 128 | 384 |
| 360p | 1000 | 64 | 128 |

### **Closed Captions**

This section is to specify delivery of closed caption files. We support the following formats ( TTML and WebVTT are preferred formats):

* TTML  
* WebVTT  
* SMPTE-TT  
* SRT  
* SAMI  
* SCC  
* DFXP

```xml
<media:subTitle
  type="application/ttml+xml"
  lang="en-US"
  href="[http://media.zenfs.com/community-sample.ttml](http://media.zenfs.com/community-sample.ttml)" />

```

Lists of format specifications

* TTML Specification: http://www.w3.org/TR/ttaf1-dfxp/  
* WebVTT Specification: https://www.w3.org/TR/webvtt1/  
* SRT Specification: https://www.matroska.org/technical/specs/subtitles/srt.html  
* SAMI File example: https://msdn.microsoft.com/en-us/library/windows/desktop/dd564300(v=vs.85).aspx  
* http://www.rssboard.org/media-rss\#media-subtitle  
* Sample Closed Caption File: http://media.zenfs.com/en\_us/video/sample/closedcaption.ttml