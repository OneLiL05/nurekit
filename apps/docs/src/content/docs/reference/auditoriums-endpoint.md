---
title: Auditoriums endpoint
description: A reference page in my new Starlight docs site.
---

## `findOne`

Method returns a group.

### Example

```typescript
import { Nurekit } from "nurekit";

const nurekit = new Nurekit();

const auditorium = await nurekit.auditoriums.findOne("285");
```

### API

```typescript
const { Id, Name } = await nurekit.auditoriums.findOne(name);
```

#### Input

- `name` - name of the auditorium you want to get info about **(required)**

#### Output

In output you will get an object with such fields:

- `Id: number`
- `Name: string`

## `findMany`

Method returns an array of auditoriums.

### Example

```typescript
import { Nurekit } from "nurekit";

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

- `Id: number`
- `Name: string`

## `getSchedule`

Method returns a schedule for an auditorium.

### Example

```typescript
import { Nurekit } from "nurekit";

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

- `Id: number`
- `StartTime: number`
- `EndTime: number`
- `Auditorium: string`
- `NumberPair: number`
- `Type: string`
- `Groups: IGroup[]`
  - `Id: number`
  - `Name: string`
- `Teachers: ITeacher[]`
  - `Id: number`
  - `FullName: string`
  - `ShortName: string`
- `Subject: ISubject[]`
  - `Id: number`
  - `Brief: string`
  - `Title: string`
