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

### Get auditoriums

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D1%96%D1%97)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const auditories = await nurekit.auditoriums.findMany()
```

**Output:**

```ts
{
  id: number;
  name: string;
}[]
```

### Get auditorium

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const auditories = await nurekit.auditoriums.findOne({ name: "285" })
```

**Input:**

```ts
{
  name: string
}
```

**Output:**

```ts
{
  id: number;
  name: string;
}
```

### Get groups

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B3%D1%80%D1%83%D0%BF%D0%B8)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const groups = await nurekit.groups.findMany()
```

**Output:**

```ts
{
  id: number;
  name: string;
}[]
```

### Get a group

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const groups = await nurekit.groups.findOne({ name: "пзпі-23-5" })
```

**Input:**

```ts
{
  name: string
}
```

**Output:**

```ts
{
  id: number;
  name: string;
}
```

### Get teachers

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B2%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4%D0%B0%D1%87%D1%96%D0%B2)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const teachers = await nurekit.teachers.findMany()
```

**Output:**

```ts
{
  id: number;
  fullName: string;
  shortName: string;
}[]
```

### Get teacher

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D0%B2%D0%B8%D0%BA%D0%BB%D0%B0%D0%B4%D0%B0%D1%87%D1%96%D0%B2)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const teachers = await nurekit.teachers.findOne({ shortName: "Боцюра О. А." })
```

**Input:**

```ts
{
  shortName: string;
}
```

**Output:**

```ts
{
  id: number;
  fullName: string;
  shortName: string;
}
```

### Get schedule

[Reference](https://nure-dev.pp.ua/#%D0%B7%D0%B0%D0%BF%D0%B8%D1%82-%D0%BD%D0%B0-%D1%80%D0%BE%D0%B7%D0%BA%D0%BB%D0%B0%D0%B4)

**Example:**

```js
import { Nurekit } from "@nurejs/api"

const nurekit = new Nurekit()

const schedule = await nurekit.groups.getSchedule({
  groupName: "пзпі-23-5",
  startTime: "2023-09-11",
  endTime: "2023-09-15",
});
```

**Input:**

```ts
{
  groupName: string,
  startTime: string,
  endTime: string,
}
```

**Output:**

```ts
{
  id: number;
  startTime: number;
  endTime: number;
  auditorium: string;
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
