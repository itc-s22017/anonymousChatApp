export default async function Home() {

  type Test = {
    message: string
  } 
  const response = await fetch("http://localhost:4000/test", {
    method: "GET",
    cache: "no-store",
  });

  const content: Test = await response.json();
  console.log(content.message);

  return (
    <p>{content.message}</p>
  );
}
