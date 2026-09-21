# Sunbulah School — Content Brief

Everything on the site traced back to a source, so you know what is safe to publish
and what has to be confirmed with the school before launch.

**Read this before the site goes live.** Nothing here was invented to fill space, but
several items are reasonable inferences rather than confirmed fact, and they are marked.

---

## 1. Where the data came from

The school has no existing website. Everything was reconstructed from its own public
social presence:

| Source | What it gave us |
|---|---|
| [Facebook `/SunbulahSchool`](https://www.facebook.com/SunbulahSchool/) | Legal name `مدرسة السنبلة الابتدائية الأهلية المختلطة`, city (Al-Hillah/Babil) |
| [Instagram `@sanbula2016`](https://www.instagram.com/sanbula2016/) | Trading name `مؤسسة السنبلة التعليمية`, phone, location "بابل - الكفل", positioning line |
| [Threads `@sanbula2016`](https://www.threads.com/@sanbula2016) | **The most valuable source** — KG founded 2016, primary founded 2019, licensed by Babil education directorate, and real activity posts |

---

## 2. Confirmed facts (safe to publish)

- **Trading name:** مؤسسة السنبلة التعليمية (روضة ومدرسة)
- **Legal name:** مدرسة السنبلة الابتدائية الأهلية المختلطة
- **Kindergarten founded:** 2016 — the Instagram handle `sanbula2016` corroborates this
- **Primary school founded:** 2019
- **Licensed by:** مديرية تربية بابل (Babil Directorate of Education)
- **Co-educational** (مختلطة) — stated in the legal name itself
- **Location:** الكفل، محافظة بابل، العراق
- **Phone:** 07700097426
- **Real activities**, all from the school's own posts:
  - الرسم على الفخار — pottery painting workshop
  - مسابقة الرسم للموهوبين — gifted young artists' drawing competition
  - خدمة زائري الإمام الحسين — pupils distributing refreshments to pilgrims
  - يوم الطفل العالمي — World Children's Day

> The Facebook page lists the city as **الحلة** while Instagram says **الكفل**. Both are in
> Babil governorate and are ~25km apart. The site currently says الكفل, following the more
> specific and more recent source. **Confirm which is correct.**

---

## 3. [CONFIRM] — plausible, but not verified

These are on the page now because a school landing page is useless without them. Each is a
reasonable inference about an Iraqi private primary school, **not** something the school
stated. Walk through this list with the principal.

| Item | What the site currently claims | Why it needs checking |
|---|---|---|
| Grades offered | Grades 1–6 | Standard Iraqi primary structure — but they may not run all six yet |
| Ages | KG from 3, primary to 12 | Inferred from the stage structure |
| Curriculum | Official Iraqi national curriculum + enrichment in English/Maths | The "enrichment" claim is ours. Only keep it if it's true. |
| Class sizes | "صفوف بأعداد محدودة" (small classes) | A competitive claim. Needs a real number or softer wording. |
| Teaching staff | "كادر تعليمي مؤهل" | Safe framing, but confirm they're comfortable with it |
| Parent contact | Reports, teacher meetings, class messaging group | Confirm the actual channels |
| Safety/supervision | Supervised arrival to handover | Confirm the real policy |
| Enrolment documents | 5-item list (civil ID, parent ID, photos, health report, transfer certificate) | **Highest priority to verify** — parents will act on this |
| Exact address | Only "الكفل، بابل" | Need street / nearest landmark + a Google Maps pin |
| **Director's name, title and photo** | Placeholder portrait + the literal text "اسم المدير / المديرة" | **Client said they will send the photo.** The quoted line beneath it was written by us — confirm or replace. |
| **Grade groupings (1–3 / 4–6)** | Shown as "الصفوف الأولى" and "الصفوف العليا" | A presentational grouping for the four-card layout, **not** a claim that these are separate programmes. Confirm the school is happy with the framing. |
| "بلا رسوم إضافية" on the activities card | Claims activities carry no extra fee | We inferred this. If activities are charged, it must change. |
| "تُحدَّد الرسوم مع بداية العام" | Implies fees are set annually and discussed by phone | Confirm this is how they want fees handled on the site |

---

## 4. [PLACEHOLDER] — do not launch as-is

| Item | Location | Action |
|---|---|---|
| **Event calendar dates** | `#events` section | Six events. **Only World Children's Day (20 November) is a real fixed date.** The other five days/months are invented as a plausible Iraqi school year and must be replaced with the school's actual calendar. An on-page note already says dates are indicative. |
| **Daily timetable** | `#day` section | Times (7:45–13:00) are invented as a plausible Iraqi school day. Replace with the real timetable, or delete the section. A footnote already says times are indicative. |
| **All photography** | Every image on the page | 3 hero slides + 8 gallery + 4 activity + 1 director = **16 images**. See §5. |
| **School transport FAQ** | `content/content.json` | Written but deliberately left off the page — we don't know if transport exists. Answer it properly or drop it. |
| **Parent testimonials** | Not on the page | Deliberately omitted. Collect three real quotes with written permission, or leave the section out. **Do not fabricate these** — it is a legal and reputational risk. |
| **Email address** | — | None found. Get one, or keep WhatsApp as the only channel (which is honestly fine for this market). |

---

## 5. Photography needed

**16 images in total.** Each slot carries a `data-replace` attribute describing the shot
it is waiting for — search the HTML for `data-replace` to find them all.

**Hero slider (3 — landscape, 1920px wide).** These sit behind white text, so they need
quiet space on one side and must not be busy where the copy falls:

1. School entrance or a classroom in use
2. Pupils in a lesson
3. Pottery workshop or an art activity

**Gallery (8 — mixed crops).** Two display tall, two wide, four square-ish:

4. Classroom in use *(tall)*
5. Morning assembly in the yard *(wide)*
6. Pottery painting workshop
7. Pupils with competition artwork
8. Kindergarten activity
9. Community service *(tall)*
10. World Children's Day celebration *(wide)*
11. The school building or entrance

**Activity cards (4 — portrait 3:4).** Items 12–15: pottery, drawing competition,
community service, World Children's Day. These can be the same shoots as the gallery,
cropped tall.

**Director portrait (1 — portrait 4:5).** Item 16. *The client has said they will send this.*

Many of these already exist on the school's Instagram and can be requested at full
resolution.

**Rules:**

- **Written parental consent is required before publishing any identifiable child.**
  This is the single most important item in this document.
- Export 1600px wide (1920px for the hero slides), WebP, under 200KB.
- Keep each image's existing `width`/`height` — they reserve layout space and stop the
  page jumping as images load.
- The gallery lightbox opens whatever is in `data-gal`, so point that at the full-size
  file and the `src` at a smaller thumbnail.

---

## 6. Questions to put to the school

Copy-paste list for the client call:

1. الحلة أم الكفل؟ وما العنوان بالتحديد (أقرب نقطة دالة)؟
2. ما الصفوف المتوفرة فعلياً هذا العام؟ (الأول إلى السادس؟)
3. ما أعمار القبول في الروضة؟ وهل يوجد صف تمهيدي؟
4. ما المستندات المطلوبة للتسجيل بالضبط؟
5. ما مواعيد الدوام الحقيقية للروضة وللابتدائية؟
6. كم عدد التلاميذ في الصف الواحد؟
7. هل تتوفر خدمة نقل مدرسي؟
8. هل الرقم 07700097426 يستقبل واتساب؟ وهل يوجد بريد إلكتروني؟
9. هل توجد رسوم دراسية تُنشر على الموقع، أم يُفضّل الاستفسار هاتفياً؟
10. اسم مدير/مديرة المدرسة كما تريدون ظهوره؟
11. هل لديكم شعار (لوغو) رسمي بصيغة عالية الدقة؟
12. هل نستطيع نشر صور التلاميذ؟ وهل لديكم موافقات أولياء الأمور؟
13. ما التواريخ الفعلية لفعاليات هذا العام (بداية الدوام، اجتماع أولياء الأمور، الحفل الختامي)؟
14. هل الأنشطة الفنية مشمولة بالرسوم أم عليها أجور إضافية؟
15. نحتاج صورة المدير/المديرة، والاسم واللقب كما تريدون ظهورهما.

---

## 7. Editorial voice

The site's voice was built around the literal meaning of the school's name — **سنبلة**,
an ear of wheat — and the Qur'anic image of one grain yielding seven (2:261). That runs
through the hero, the About section, the logo mark and the section dividers.

This is the one creative decision that most needs the principal's blessing. **Read the
About section aloud to them.** If it doesn't sound like them, rewrite it — everything
else on the page can survive a voice change, but that section is the site's centre of
gravity.

Fee information is deliberately absent as a number. The stage cards say fees are set at
the start of the year and route parents to WhatsApp instead, which is how most schools
in this market prefer to handle it. If they want published fees, add them to the stage
cards — don't bury them in the FAQ.
