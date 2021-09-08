# Helpdesk App

Simple Helpdesk App built on Adminbro(Aminjs).

# Stack

MERN Stack

#

## 1 🚀 Install

```sh
npm i
```

copy `.env-example` to `.env` and Add the Required ENV

## 2 🌱 Migrations

```sh
node src/admin/migrations.js
```

**super Admin credentials**

```txt
email: admin@admin.com
pass: admin
```

## 3 Grant Permissions to the Available Roles

### User Grants

**Resource**

- **Ticket**

**Actions**

- new list show addReply

**Resource**

- **Comment**

**Actions**

- list new

### Agent Grants

**Resource**

- **Ticket**

**Actions**

- new list show addReply edit search

**Resource**

- **Comment**

**Actions**

- list new
