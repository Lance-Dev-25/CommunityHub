const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { data } = require("react-router-dom");

const rawUsers = {
  docs: [],

  insertOne(doc) {
    const _id = this.docs.length + 1;
    this.docs.push({ _id, ...doc }); 
    return { insertedId: _id };
  },

  findOne(query) {
    const keys = Object.keys(query);

    return (
      this.docs.find((d) =>
        keys.every((k) => d[k] === query[k])
      ) || null
    );
  },
};

// Registration
function registerNaive({ username, email, password }) {
  const { insertedId } = rawUsers.insertOne({
    username,
    email,
    password,
  });

  return {
    _id: insertedId,
    username,
    email,
    password,
  };
}

// Admin seed
function seedAdminNaive() {
  rawUsers.insertOne({
    username: "admin",
    email: "admin@communityhub.io",
    password: "admin123",
  });
}

// Login
function loginNaive(email, password) {
  const user = rawUsers.findOne({ email });

  if (!user) {
    return {
      ok: false,
      error: "No account with that email",
    };
  }

  if (user.password !== password) {
    return {
      ok: false,
      error: "Wrong password",
    };
  }

  return {
    ok: true,
    user,
  };
}

console.log("\n===== PART A — hand-rolled auth =====");

const apiResponse = registerNaive({
  username: "amina",
  email: "amina@example.com",
  password: "chelsea2024",
});

seedAdminNaive();

console.log(
  "what the API sent back ->",
  JSON.stringify(apiResponse)
);

console.log(
  "what is in the database ->",
  JSON.stringify(rawUsers.docs)
);

console.log(
  "login(wrong email) ->",
  loginNaive("nobody@example.com", "x").error
);

console.log(
  "login(wrong password) ->",
  loginNaive("amina@example.com", "x").error
);



// ============================================
// PART B — hash at the call site
// ============================================

async function registerHashed({ username, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { insertedId } = rawUsers.insertOne({
    username,
    email,
    password: hashedPassword,
  });

  return {
    _id: insertedId,
    username,
    email,
  };
}

//B2
async function loginHashed(login,password) {
    const user = rawUsers.findOne({ email: login });

    if (!user) {
      return {
        ok: false,
        error: "Invalid credentials",
      };
    }

    const passwordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordCorrect) {
    return {
      ok: false,
      error: "Invalid credentials",
    };
  }

  return {
    ok: true,
    user,
  };
}

// B3

async function seedAdminHashed() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  rawUsers.insertOne({
    username: "admin",
    email: "admin@communityhub.io",
    password: hashedPassword,
  });
}

// B4

// B4
async function runPartB() {
  const user = await registerHashed({
    username: "amina",
    email: "amina2@example.com",
    password: "chelsea2024",
  });

  await seedAdminHashed();

  console.log("\n===== PART B — hashed auth =====");
  console.log("registered user ->", user);
  console.log("database ->", JSON.stringify(rawUsers.docs));
}

runPartB();