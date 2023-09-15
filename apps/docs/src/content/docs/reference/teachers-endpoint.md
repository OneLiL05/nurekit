---
title: Teachers endpoint
description: A reference page in my new Starlight docs site.
---

## `findOne`

Method returns an auditorium.

### Example

```typescript
import { Nurekit } from "@nurejs/api";

const nurekit = new Nurekit();

const auditorium = await nurekit.teachers.findOne("Боцюра О. А.");
```

### API

```typescript
const { id, name } = await nurekit.teachers.findOne(shortName);
```

#### Input

- `shortName` - short name of the teacher you want to get info about **(required)**

#### Output

In output you will get an object with such fields:

- `id: number`
- `shortName: string`
- `fullName: string`

## `findMany`

Method returns an array of teachers.

### Example

```typescript
import { Nurekit } from "@nurejs/api";

const nurekit = new Nurekit();

const auditoriums = await nurekit.teachers.findMany();
```

### API

```typescript
const auditoriums = await nurekit.teachers.findMany();
```

#### Input

This method doesn't need any arguments.

#### Output

In output you will get an array of objects with such fields:

- `id: number`
- `shortName: string`
- `fullName: string`

## `getSchedule`

Method returns a schedule for a teacher.

### Example

```typescript
import { Nurekit } from "@nurejs/api";

const nurekit = new Nurekit();

const schedule = await nurekit.groups.getSchedule({
	teacherName: "Боцюра О. А.",
	startTime: "2023-09-11",
	endTime: "2023-09-15",
});
```

### API

```typescript
const schedule = await nurekit.groups.getSchedule({
	teacherName,
	startTime,
	endTime,
});
```

#### Input

- `teacherName: string` - the short name of a teacher you want to get schedule for **(required)**;
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
