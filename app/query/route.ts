import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listOfIssuers() {
	const data = await sql`
    SELECT *
    FROM Issuers
  `;

	return data;
}

export async function GET() {

  try {
  	return Response.json(await listOfIssuers());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
  