#!/usr/bin/env python3
"""Static file server for the headless test loop, with HTTP caching switched OFF.

`python -m http.server` sends Last-Modified but no Cache-Control and no ETag, so a
browser falls back to HEURISTIC freshness (roughly 10% of the file's age) and serves
the ES modules straight from its disk cache without ever revalidating them. Against a
Chrome profile left over from an earlier session that means the SUITES THEMSELVES can
be a day old: the run then executes yesterday's assertions, finds nothing wrong with
them, and prints a perfectly well-formed `RESULT ALL PASS` for code it never loaded.
That failure is invisible - the sticky-fatal reporter only catches errors, and a stale
file throws none. Sending `Cache-Control: no-store` on every response closes it for
every run, whatever profile the browser happens to be using. (task 235)

`allow_reuse_address` is off for the same class of reason. Python turns it ON by
default, and on Windows that lets a SECOND server bind a port another process is
already listening on: the new one starts without complaint while the OLD one keeps
answering, so the suite runs green against whatever tree that process was started in.
With it off, a second bind fails loudly and immediately instead.

Usage:  python build/serve.py [--port 8848] [--directory <repo root>]
"""

import argparse
import http.server
import os
import sys


class NoStoreHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that forbids caching of everything it serves."""

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        self.send_header('Pragma', 'no-cache')
        super().end_headers()


class SingleBindServer(http.server.ThreadingHTTPServer):
    """A server that refuses to shadow one already listening on the port."""

    allow_reuse_address = False
    daemon_threads = True


def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ap = argparse.ArgumentParser(description='No-cache static server for the test loop.')
    ap.add_argument('--port', type=int, default=8848)
    ap.add_argument('--directory', default=repo_root, help='document root (default: the repo root)')
    args = ap.parse_args()

    def handler(*a, **kw):
        return NoStoreHandler(*a, directory=args.directory, **kw)

    try:
        server = SingleBindServer(('127.0.0.1', args.port), handler)
    except OSError as e:
        # The common case is another server (often a forgotten one from an earlier
        # session, serving an older tree) already holding the port. Say so plainly:
        # silently sharing it is the whole failure this refusal exists to prevent.
        print(f'serve.py: cannot bind port {args.port}: {e}', file=sys.stderr)
        print('serve.py: something is already listening there - stop it first.', file=sys.stderr)
        return 2

    print(f'serve.py: serving {args.directory} on http://127.0.0.1:{args.port}/ (no-store)', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == '__main__':
    sys.exit(main())
