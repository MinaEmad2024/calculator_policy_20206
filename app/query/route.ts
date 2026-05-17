import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listOdPolicies() {
	const data = await sql`
    SELECT *
    FROM Policies
  `;

	return data;
}

export async function GET() {

  try {
  	return Response.json(await listOdPolicies());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
  