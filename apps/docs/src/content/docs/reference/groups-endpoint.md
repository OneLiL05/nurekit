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
const { Id, Name } = await nurekit.groups.findOne(name);
```

#### Input

- `name` - name of the group you want to get info about **(required)**

#### Output

In output you will get an object with such fields:

- `Id: number` - the group's id;
- `Name: string` - the group's name.

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

- `Id: number`
- `Name: string`

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
