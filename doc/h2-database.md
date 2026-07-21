# H2 Database Configuration

H2 is used as the embedded database for development. It supports two modes: **local (file-based)** and **in-memory**.

## Modes

### File-Based (Local)

Data is persisted to disk and survives application restarts.

```properties
spring.datasource.url=jdbc:h2:file:./db/chatdb
spring.datasource.username=albert
spring.datasource.password=1234
```

| Use case | Development with persistent data |
| -------- | -------------------------------- |

### In-Memory

Data is lost when the application stops. Faster for testing and ephemeral sessions.

```properties
spring.datasource.url=jdbc:h2:mem:chatdb
spring.datasource.username=sa
spring.datasource.password=
```

| Use case | Quick tests, throwaway sessions |
| -------- | ------------------------------- |

## Connection Details (current config — file-based)

| Property     | Value                             |
| ------------ | --------------------------------- |
| JDBC URL     | `jdbc:h2:file:./db/chatdb`        |
| Driver Class | `org.h2.Driver`                   |
| Username     | `albert`                          |
| Password     | `1234`                            |
| Dialect      | `org.hibernate.dialect.H2Dialect` |

## Database Location

File-based data is stored at the project root:

```
project-root/
├── db/
│   ├── chatdb.mv.db      # Main database file
│   └── chatdb.trace.db   # Trace log (if enabled)
└── ...
```

## H2 Console

Available at `/h2-console` while the app is running.

**Login (file-based):**

- JDBC URL: `jdbc:h2:file:./db/chatdb`
- Username: `albert`
- Password: `1234`

**Login (in-memory):**

- JDBC URL: `jdbc:h2:mem:chatdb`
- Username: `sa`
- Password: *(blank)*

> Note: The JDBC URL must match the mode set in `application.properties` — `file:` prefix for file-based, `mem:` for in-memory.

## Comparison

| Aspect       | File-Based (`file:`)       | In-Memory (`mem:`)   |
| ------------ | -------------------------- | -------------------- |
| Persistence  | Data survives restarts     | Lost on restart      |
| Performance  | Slightly slower (disk I/O) | Faster (RAM only)    |
| Use Case     | Development, debugging     | Testing, prototyping |
| Console URL  | `jdbc:h2:file:./db/chatdb` | `jdbc:h2:mem:chatdb` |
| Default user | `albert` / `1234`          | `sa` / blank         |

## Configuration

Current file-based config in `application.properties`:

```properties
spring.datasource.url=jdbc:h2:file:./db/chatdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=albert
spring.datasource.password=1234
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

To switch to in-memory, replace the datasource URL and credentials.

## How `application.properties` Works

Spring Boot reads `application.properties` at startup and automatically configures beans based on the properties found (auto-configuration).

| Property                            | What it does                                            |
| ----------------------------------- | ------------------------------------------------------- |
| `spring.datasource.url`             | JDBC URL — tells Spring Boot where the database is      |
| `spring.datasource.username`        | Database login user                                     |
| `spring.datasource.password`        | Database login password                                 |
| `spring.datasource.driverClassName` | JDBC driver class (auto-detected, but explicit here)    |
| `spring.jpa.database-platform`      | Hibernate dialect for H2                                |
| `spring.jpa.hibernate.ddl-auto`     | Schema strategy: `create`, `update`, `validate`, `none` |
| `spring.jpa.show-sql`               | Logs generated SQL to the console                       |
| `spring.h2.console.enabled`         | Enables the H2 web console                              |
| `spring.h2.console.path`            | URL path for the H2 console                             |

**Precedence order** (lower number wins):

1. Command-line arguments (`--spring.datasource.username=admin`)
2. Environment variables (`SPRING_DATASOURCE_USERNAME=admin`)
3. `application.properties` (this file)
4. Defaults baked into Spring Boot

## User & Password

The `username` and `password` properties serve two purposes:

1. **H2 credentials** — used to authenticate when connecting to the H2 database engine.
2. **DataSource authentication** — Spring Boot's `HikariCP` connection pool uses these to open the JDBC connection.

Both the app and the H2 console require the same credentials:

```properties
spring.datasource.username=albert
spring.datasource.password=1234
```

When switching to in-memory mode, the default H2 credentials are `sa` with a blank password (no changes needed), but you may keep custom credentials if desired.

## Notes

- `ddl-auto=create` — schema is dropped and recreated on each startup.
- Set `ddl-auto=update` to preserve data across restarts (file-based mode only).
- The `db/` directory is excluded from version control (see `.gitignore`).
