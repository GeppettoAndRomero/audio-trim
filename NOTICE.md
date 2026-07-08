# Third-party notices

The source code in this repository is licensed under the [MIT License](./LICENSE).
It depends on the following third-party component, which is distributed under a
different (weak-copyleft) license. That component keeps its own license; only its
attribution and the rights it grants you are recorded here.

## @breezystack/lamejs — LGPL-3.0

- **Package:** [`@breezystack/lamejs`](https://www.npmjs.com/package/@breezystack/lamejs) **1.2.7**
- **License:** **LGPL-3.0** (the rest of this application is MIT)
- **Upstream:** [lamejs](https://github.com/zhuker/lamejs) — a pure-JavaScript port of the
  LAME MP3 encoder.
- **What it does here:** encodes the trimmed audio range to MP3 in the browser. It is
  pure JavaScript — no WebAssembly and no native binary.
- **Modifications:** none. The library is used **unmodified**, as an npm dependency.

### Your rights under the LGPL

You may use a **modified version of lamejs** in place of the one shipped here, and the
LGPL guarantees you can do so. Because this entire application is open source and the
`@breezystack/lamejs` version is pinned in `package.json`, you can exercise that right by:

1. forking this repository,
2. replacing or modifying the `@breezystack/lamejs` dependency (or rebuilding it from its
   [upstream source](https://github.com/zhuker/lamejs)),
3. running `npm install && npm run build`.

The resulting build links your modified library. Providing the application in this
recombinable, open-source form is how this project satisfies **LGPL-3.0 §4** (Combined
Works). Because lamejs is pure JavaScript, its corresponding source is also directly
available from npm and from the upstream repository.

The full text of the GNU **LGPL-3.0** and **GPL-3.0** is available at
<https://www.gnu.org/licenses/lgpl-3.0.html> and <https://www.gnu.org/licenses/gpl-3.0.html>.

---

Other dependencies — Astro, Preact, and @astrojs/preact — are distributed under the MIT License.
