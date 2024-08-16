# Encircle specific direnv extensions

Implements the standardized project configuration patterns for all Encircle projects.

Distributed in a publicly accessible fashion so that it can be used with the
builtin [`source_url`][source_url] without further authentication.

[source_url]: https://direnv.net/man/direnv-stdlib.1.html#codesourceurl-lturlgt-ltintegrity-hashgtcode

## Usage

Follow instructions in [Project Configuration](https://encircle.atlassian.net/l/cp/PT17zsf1).

## Conventions

- The pattern is activated when sourced, no further command is required.
- All direnv extension commands start with a `en_` prefix.
- The `_en` prefix is reserved for private commands and variables.
