import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { policyDetails, issuers , policies, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers(tx:postgres.TransactionSql) {
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await tx`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // const insertedUsers = await Promise.all(
  //   users.map(async (user) => {
  //     const hashedPassword = await bcrypt.hash(user.password, 10);
  //     return tx`
  //       INSERT INTO users (id, name, email, password)
  //       VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
  //       ON CONFLICT (id) DO NOTHING;
  //     `;
  //   }),
  // );
    const insertedUsers = [];

  // 4. Replaced Promise.all with a sequential loop to respect the transaction
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    // 5. Changed 'sql' to 'tx'
    const result = await tx`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
        insertedUsers.push(result);
  }

  return insertedUsers;
}

async function seedPolicies(tx:postgres.TransactionSql) {
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await tx`
    CREATE TABLE IF NOT EXISTS Policies (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      issuer_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(255) NOT NULL,
      CONSTRAINT fk_issuer FOREIGN KEY (issuer_id) REFERENCES Issuers(id) ON DELETE CASCADE
    );
  `;

  // const insertedPolicies = await Promise.all(
  //   policies.map(
  //     (policy) => tx`
  //       INSERT INTO Policies (id,issuer_id, name, code)
  //       VALUES (${policy.id},${policy.issuer_id}, ${policy.name}, ${policy.code})
  //       ON CONFLICT (id) DO NOTHING;
  //     `,
  //   ),
  // );
  const insertedPolicies = [];

  for ( const policy of policies ){
  const result = await tx`
      INSERT INTO Policies (id,issuer_id, name, code)
      VALUES (${policy.id},${policy.issuer_id}, ${policy.name}, ${policy.code})
      ON CONFLICT (id) DO NOTHING;
    `;
    insertedPolicies.push(result);
  }

  return insertedPolicies;
}

async function seedIssuers(tx:postgres.TransactionSql) {
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await tx`
    CREATE TABLE IF NOT EXISTS Issuers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
  `;

  // const insertedIssuers = await Promise.all(
  //   issuers.map(
  //     (issuer) => tx`
  //       INSERT INTO Issuers (id, name, email)
  //       VALUES (${issuer.id}, ${issuer.name}, ${issuer.email})
  //       ON CONFLICT (id) DO NOTHING;
  //     `,
  //   ),
  // );

  const insertedIssuers = [];

  // Sequential execution to keep the transaction stable
  for (const issuer of issuers) {
    const result = await tx`
      INSERT INTO Issuers (id, name, email)
      VALUES (${issuer.id}, ${issuer.name}, ${issuer.email})
      ON CONFLICT (id) DO NOTHING;
    `;
    insertedIssuers.push(result);
  }

  return insertedIssuers;
}

async function seedPolicyDetails(tx:postgres.TransactionSql) {
  // 1. Enable the UUID extension if it hasn't been enabled yet
  await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // 2. Drop the old table during development to avoid column mismatch crashes
  await tx`DROP TABLE IF EXISTS PolicyDetails;`;

  // 3. Create the table matching your exact array structure
  await tx`
    CREATE TABLE IF NOT EXISTS PolicyDetails (
      id UUID PRIMARY KEY,
      policy_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      deductables DECIMAL(10,2) NOT NULL,
      coins INT NOT NULL,   
      max DECIMAL(10,2) NOT NULL,
      min DECIMAL(10,2) NOT NULL,
      coins2 INT NOT NULL,  
      coins3 INT NOT NULL,  
      CONSTRAINT fk_policy FOREIGN KEY (policy_id) REFERENCES Policies(id) ON DELETE CASCADE
    );
  `;

  // // 4. Batch insert your 20 array records simultaneously 
  // const insertedDetails = await Promise.all(
  //   policyDetails.map(
  //     (detail) => tx`
  //       INSERT INTO PolicyDetails (id, policy_id, name, deductables, coins, max, min, coins2, coins3)
  //       VALUES (
  //         ${detail.id}, 
  //         ${detail.policy_id}, 
  //         ${detail.name}, 
  //         ${detail.deductables}, 
  //         ${detail.coins}, 
  //         ${detail.max}, 
  //         ${detail.min}, 
  //         ${detail.coins2}, 
  //         ${detail.coins3}
  //       )
  //       ON CONFLICT (id) DO NOTHING;
  //     `,
  //   ),
  // );
  const insertedDetails = []

  for(const policyDetail of policyDetails){
    const result = await tx`
        INSERT INTO PolicyDetails (id, policy_id, name, deductables, coins, max, min, coins2, coins3)
         VALUES (
           ${policyDetail.id}, 
           ${policyDetail.policy_id}, 
           ${policyDetail.name}, 
           ${policyDetail.deductables}, 
           ${policyDetail.coins}, 
           ${policyDetail.max}, 
           ${policyDetail.min}, 
           ${policyDetail.coins2}, 
           ${policyDetail.coins3}
         )
         ON CONFLICT (id) DO NOTHING;
       `;
        insertedDetails.push(result )
  }

  return insertedDetails;
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providedSecret = searchParams.get('secret');
  const expectedSecret = process.env.SEED_SECRET_KEY;

  // 2. Enforce the guard: Block access if the secret is missing or incorrect
  if (!expectedSecret || providedSecret !== expectedSecret) {
    return Response.json(
      { error: 'Unauthorized: Invalid or missing seed secret key.' }, 
      { status: 401 }
    );
  }

  try {
    const result = await sql.begin(async(sql:postgres.TransactionSql) => {
      await seedUsers(sql);
      await seedIssuers(sql);
      await seedPolicies(sql);
      await seedPolicyDetails(sql);
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json( 
      { error: error instanceof Error ? error.message : String(error) }, 
       { status: 500 });
  }
}

// Since you are hosting your development environment directly on Vercel with no local development, we cannot simply block production using process.env.NODE_ENV === 'production'. On Vercel, both your Preview deployments (development) and your Production deployment run in production mode (NODE_ENV=production).
// Instead, the most secure and reliable way to protect your database is to use a Secret API Key passed via a query parameter, combined with Vercel's system environment variables.
// Here is how to implement the production guard for your Vercel setup:
// ## 1. Update your GET Function
// Replace your current GET function with this secure version:

// export async function GET(request: Request) {
//   // 1. Get the secret key from the URL query parameters (e.g., /seed?secret=your_key)
//   const { searchParams } = new URL(request.url);
//   const providedSecret = searchParams.get('secret');
//   const expectedSecret = process.env.SEED_SECRET_KEY;

//   // 2. Enforce the guard: Block access if the secret is missing or incorrect
//   if (!expectedSecret || providedSecret !== expectedSecret) {
//     return Response.json(
//       { error: 'Unauthorized: Invalid or missing seed secret key.' }, 
//       { status: 401 }
//     );
//   }

//   try {
//     const result = await sql.begin(async(tx: postgres.TransactionSql) => {
//       await seedUsers(tx);
//       await seedIssuers(tx);
//       await seedPolicies(tx);
//       await seedPolicyDetails(tx);
//     });

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     console.error("Seeding crashed:", error);
//     return Response.json( 
//       { error: error instanceof Error ? error.message : String(error) }, 
//       { status: 500 }
//     );
//   }
// }

// ## 2. Set Up Your Environment Variable in Vercel
// To make this work, you need to create a secure token that only you know:

//    1. Go to your Vercel Dashboard.
//    2. Select your project and navigate to Settings > Environment Variables.
//    3. Add a new variable:
//    * Key: SEED_SECRET_KEY
//       * Value: Choose a long, secure random string (e.g., my_ultra_secure_seed_token_2026).
//    4. Select the environments where you want this to apply (you can check Preview and Production).
//    5. Click Save and redeploy your application so the variables take effect.

// ## 3. How to Trigger Your Seed Function
// Once deployed, if you try to visit https://your-vercel-domain.com normally, it will reject the request with a 401 Unauthorized error.
// To successfully trigger the seeding process, append your secret key to the URL as a query parameter like this:

// https://your-vercel-domain.com

// Would you like help setting up a safety check that wipes the tables cleanly before inserting data so you can safely run this URL multiple times during your Vercel development?

