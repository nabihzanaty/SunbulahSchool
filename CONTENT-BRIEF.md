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
reasonable inference from an Iraqi private primary school, **not** something the school stated.
Walk through this list with the principal.

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
| Principal's name | Generic "إدارة مؤسسة السنبلة التعليمية" | Replace with a real name and title if they want one |

---

## 4. [PLACEHOLDER] — do not launch as-is

| Item | Location | Action |
|---|---|---|
| **Daily timetable** | `#day` section | Times (7:45–13:00) are invented as a plausible Iraqi school day. Replace with the real timetable, or delete the section. A footnote already says times are indicative. |
| **School transport FAQ** | `content/content.json` | Written but deliberately left out of the page — we don't know if transport exists. Answer it properly or drop it. |
| **Parent testimonials** | Not on the page | Deliberately omitted. Collect three real quotes with written permission, or leave the section out. **Do not fabricate these** — it's a legal and reputational risk. |
| **All photography** | Every `<img>` | Every image points at `assets/img/placeholder.svg`. See §5. |
| **Email address** | — | None found. Get one, or keep WhatsApp as the only channel (which is honestly fine for this market). |

---

## 5. Photography needed

Each `<img>` carries a `data-replace` attribute describing the shot it's waiting for.
Search the HTML for `data-replace` to find them all.

1. **Hero** — wide shot of the entrance or a classroom in use
2. **Kindergarten** — children at a table, mid-activity
3. **Primary** — a classroom, or a pupil at the board
4. **Pottery workshop** — hands painting clay
5. **Drawing competition** — pupils with their artwork
6. **Community service** — pupils distributing refreshments
7. **World Children's Day** — the celebration

Many of these already exist on the school's Instagram and can be requested at full resolution.

**Rules:**
- **Written parental consent is required before publishing any identifiable child.** This is
  the single most important item in this document.
- Export 1600px wide, WebP, under 200KB.
- Keep each `<img>`'s existing `width`/`height` — they reserve layout space and stop the page
  jumping as images load.

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

---

## 7. Editorial voice

The site's voice was built around the literal meaning of the school's name — **سنبلة**,
an ear of wheat — and the Qur'anic image of one grain yielding seven (2:261). That runs
through the hero, the About section, the logo mark and the section dividers.

This is the one creative decision that most needs the principal's blessing. **Read the
About section aloud to them.** If it doesn't sound like them, rewrite it — everything else
on the page can survive a voice change, but that section is the site's centre of gravity.

Fee information is deliberately absent. Most schools in this market prefer to discuss fees
by phone. If they want fees published, add a section — don't bury it in the FAQ.
