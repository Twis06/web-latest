import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import type { Entry } from "@/content/cv";
import { profile, sections } from "@/content/cv";
import { Arrow } from "./components/arrow";
import { Contact } from "./components/contact";
import { Figure } from "./components/figure";
import { Num } from "./components/num";
import { Reveal } from "./components/reveal";
import { Strip, type StripItem } from "./components/strip";
import { Viewer, type ViewerFigure } from "./components/viewer";

const pad = (n: number) => String(n).padStart(2, "0");

// Figures are numbered down the whole page, in reading order; the viewer steps through them and
// the strip under the name shows them all.
const figures: ViewerFigure[] = [];
const strip: StripItem[] = [];
const figureIndex = new Map<Entry, number>();
const entryId = (sectionId: string, i: number) => `${sectionId}-${i + 1}`;
for (const section of sections) {
  section.entries.forEach((entry, i) => {
    if (!entry.figure) return;
    const { media } = entry.figure;
    const still =
      media.kind === "clip" ? { poster: media.poster, src: media.src } :
      media.kind === "grid" ? { poster: media.clips[0].poster, src: media.clips[0].src } :
      media.kind === "flight" ? { poster: media.runs[0].poster, src: media.runs[0].src } :
      media.kind === "set" ? { poster: media.items[0].poster, src: media.items[0].src } :
      { poster: media.poster, src: null };
    strip.push({
      n: pad(figureIndex.size + 1),
      title: entry.name ?? (typeof entry.title === "string" ? entry.title : entry.figure.caption),
      target: entryId(section.id, i),
      ...still,
    });
    figureIndex.set(entry, figureIndex.size);
  });
}
for (const entry of sections.flatMap((section) => section.entries)) {
  if (!entry.figure) continue;
  figures.push({
    n: pad(figures.length + 1),
    title: entry.name ?? (typeof entry.title === "string" ? entry.title : entry.figure.caption),
    caption: entry.figure.caption,
    media: entry.figure.media,
  });
}

// Measured figures in the bullets (95%, 2.26M, <20 ms, 30 Hz, $4,000…) count up as they arrive.
// Only a number with a unit after it counts, so years, model names and part numbers stay put.
const MEASURE = /(?<![\w.])(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(?=\s?(?:%|×|Hz|ms|M\b|°)|(?<=\d,\d{3}))/g;

function countUp(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    const parts: ReactNode[] = [];
    let last = 0;
    for (const match of node.matchAll(MEASURE)) {
      parts.push(node.slice(last, match.index), <Num key={match.index} value={match[1]} />);
      last = match.index + match[1].length;
    }
    return parts.length ? [...parts, node.slice(last)] : node;
  }
  if (Array.isArray(node)) return node.map((child, i) => <Fragment key={i}>{countUp(child)}</Fragment>);
  if (isValidElement(node) && node.type === Fragment) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return cloneElement(element, undefined, countUp(element.props.children));
  }
  return node;
}

const entryCount = sections.reduce((sum, section) => sum + section.entries.length, 0);

export default function Home() {
  const updated = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date());

  return (
    <div className="ledger">
      <header className="head cols">
        <h1 className="head__name">{profile.name}</h1>
        <p className="head__line">{profile.line}</p>
        <Contact email={profile.email} github={profile.github} photography={profile.photography} />
        <Strip items={strip} />
      </header>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="section" aria-labelledby={`${section.id}-title`}>
          <div className="opener">
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            <span className="readout">
              {section.entries.length} {section.entries.length === 1 ? "entry" : "entries"}
            </span>
          </div>
          <ol className="entries">
            {section.entries.map((entry, i) => (
              <li
                key={i}
                id={entryId(section.id, i)}
                className={entry.figure?.wide ? "entry entry--wide cols" : "entry cols"}
                data-entry=""
                data-section-id={section.id}
                data-section={section.title}
                data-index={pad(i + 1)}
                data-count={pad(section.entries.length)}
              >
                <EntryRow entry={entry} figure={figureIndex.get(entry)} />
              </li>
            ))}
          </ol>
        </section>
      ))}

      <footer className="foot">
        <p>{profile.name}</p>
        <p className="readout">
          <b>{pad(entryCount)}</b> entries · updated {updated}
        </p>
        <a className="foot__top readout" href="#main">
          Back to top
        </a>
      </footer>

      <Reveal />
      <Viewer figures={figures} />
    </div>
  );
}

function EntryRow({ entry, figure }: { entry: Entry; figure?: number }) {
  const { when, org, meta, links, press, points } = entry;

  return (
    <>
      <div className="entry__head">
        <h3 className="entry__title">{entry.title}</h3>
        {org || meta ? (
          <p className="entry__org">
            {typeof org === "object" ? (
              <a href={org.href} target="_blank" rel="noopener noreferrer">
                {org.label}
              </a>
            ) : (
              org
            )}
            {org && meta ? " · " : null}
            {meta ? <span className="entry__meta">{meta}</span> : null}
          </p>
        ) : null}
      </div>

      {when ? (
        <p className="entry__when readout">
          <span>{when[0]}</span>
          {when[1] ? <span>— {when[1]}</span> : null}
        </p>
      ) : null}

      <div className="entry__body">
        {links ? (
          <p className="links">
            {links.map((link) => (
              <a key={link.href} className="out" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <Arrow />
              </a>
            ))}
          </p>
        ) : null}
        <ul className="points">
          {points.map((point, j) => (
            <li key={j}>{countUp(point)}</li>
          ))}
        </ul>
        {press ? (
          <p className="press">
            <span className="readout">Press</span>
            {press.map((link) => (
              <a key={link.href} className="out" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <Arrow />
              </a>
            ))}
          </p>
        ) : null}
      </div>

      {entry.figure && figure !== undefined ? (
        <div className="entry__figure">
          <Figure index={figure} n={pad(figure + 1)} figure={entry.figure} />
        </div>
      ) : null}
    </>
  );
}
