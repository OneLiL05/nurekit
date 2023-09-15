---
title: Auditoriums endpoint
description: A reference page in my new Starlight docs site.
---

## `findOne`

Method returns a group.

### Example

```typescript
import { Nurekit } from "@nurejs/api";

const nurekit = new Nurekit();

const auditorium = await nurekit.auditoriums.findOne("285");
```

### API

```typescript
const { id, name } = await nurekit.auditoriums.findOne(name);
```

#### Input

- `name` - name of the auditorium you want to get info about **(required)**

#### Output

In output you will get an object with such fields:

- `id: number`
- `name: string`

## `findMany`

Method returns an array of auditoriums.

### Example

```typescript
import { Nurekit } from "@nurejs/api";

const nurekit = new Nurekit();

const auditoriums = await nurekit.auditoriums.findMany();
```

### API

```typescript
const auditoriums = await nurekit.auditoriums.findMany();
```

#### Input

This method doesn't need any arguments.

#### Output

In output you will get an array of objects with such fields:

- `id: number`
- `name: string`

## `getSchedule`

Method returns a schedule for an auditorium.

### Example

```typescript
import { Nurekit } from "@nurejs/api";

const nurekit = new Nurekit();

const schedule = await nurekit.auditoriums.getSchedule({
	auditoriumName: "287",
	startTime: "2023-09-11",
	endTime: "2023-09-15",
});
```

### API

```typescript
const schedule = await nurekit.auditoriums.getSchedule({
	auditoriumName,
	startTime,
	endTime,
});
```

#### Input

- `auditoriumName: string` - the name of an auditorium you want to get schedule for **(required)**;
- `startTime: string` - start time of the period for which you want to receive the schedule **(required)**;
- `endTime: string` - end time of the period for which you want to receive the schedule **(required)**.

#### Output

In output you will get an array of objects with such fields

- `id: number`
- `startTime: number`
- `endTime: number`
- `auditorium: string`
- `numberPair: number`
- `type: string`
- `updatedAt: Date`
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
