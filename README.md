# `nurejs/api`

> **Warning**
> The library is a work in progress still. I'm building it in public

JavaScript library for Nure API

## Installation

```shell
npm i @nurejs/api
```

## Usage

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()
```

## Contributing

If you want to contribute to improving the project, firstly read [CONTIRBUTING.md](https://github.com/OneLiL05/nurekit/blob/main/CONTIRBUTING.md)

## Methods

### `getAuditories`

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D1%96%D1%97)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const auditories = await nurekit.getAuditories()
```

**Output:**

```ts
{
  id: number;
  name: string;
}[]
```

### `getGroups`

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B3%D1%80%D1%83%D0%BF%D0%B8)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const groups = await nurekit.getGroups()
```

**Output:**

```ts
{
  id: number;
  name: string;
}[]
```

### `getTeachers`

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B2%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4%D0%B0%D1%87%D1%96%D0%B2)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const teachers = await nurekit.getTeachers()
```

**Output:**

```ts
{
  id: number;
  fullName: string;
  shortName: string;
}[]
```

### `getSchedule`

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D1%80%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const schedule = await nurekit.getSchedule({
  groupName: "пзпі-23-5",
  startTime: 1693170000,
  endTime: 1694811599,
});
```

**Input:**

```ts
{
  groupName: string,
  startTime: number,
  endTime: number,
}
```

**Output:**

```ts
{
  id: number;
  startTime: number;
  endTime: number;
  auditory: number;
  numberPair: number;
  type: string;
  updatedAt: Date;
  groups: {
    id: number;
    name: string;
  }[];
  teachers: {
    id: number;
    fullName: string;
    shortName: string;
  }[];
  subject: {
    id: number;
    brief: string;
    title: string;
  };
}[]
```

## Stay in touch

- Author - [Kyrylo Savieliev](https://github.com/OneLiL05)

## Licence

Nurekit is [GNU GPLv3.0 licenced](https://github.com/OneLiL05/nurekit/blob/main/LICENSE)
