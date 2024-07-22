---
title: Groups endpoint
description: A reference page in my new Starlight docs site.
---

## `findOne`

Method returns an auditorium.

### Example

```typescript
import { Nurekit } from "nurekit";

const nurekit = new Nurekit();

const auditorium = await nurekit.groups.findOne("пзпі-23-5");
```

### API

```typescript
const { id, name } = await nurekit.groups.findOne(name);
```

#### Input

- `name` - name of the group you want to get info about **(required)**

#### Output

In output you will get an object with such fields:

- `id: number` - the group's id;
- `name: string` - the group's name.

## `findMany`

Method returns an array of groups.

### Example

```typescript
import { Nurekit } from "nurekit";

const nurekit = new Nurekit();

const groups = await nurekit.groups.findMany();
```

### API

```typescript
const groups = await nurekit.groups.findMany();
```

#### Input

This method doesn't need any arguments.

#### Output

In output you will get an array of objects with such fields:

- `id: number`
- `name: string`

## `getSchedule`

Method returns a schedule for a group.

### Example

```typescript
import { Nurekit } from "nurekit";

const nurekit = new Nurekit();

const schedule = await nurekit.groups.getSchedule({
	groupName: "пзпі-23-5",
	startTime: "2023-09-11",
	endTime: "2023-09-15",
});
```

### API

```typescript
const schedule = await nurekit.groups.getSchedule({
	groupName,
	startTime,
	endTime,
});
```

#### Input

- `groupName: string` - the name of a group you want to get schedule for **(required)**;
- `startTime: string` - start time of the period for which you want to receive the schedule **(required)**;
- `endTime: string` - end time of the period for which you want to receive the schedule **(required)**.

#### Output

In output you will get an array of objects with such fields

- `id: number`
- `startTime: number`
- `endTime: number`
- `auditory: string`
- `numberPair: number`
- `type: string`
- `groups: IGroup[]`
  - `id: number`
  - `name: string`
- `teachers: ITeacher[]`
  - `id: number`
  - `fullName: string`
  - `shortName: string`
- `subject: ISubject[]`
  - `id: number`
  - `brief: string`
  - `title: string`
