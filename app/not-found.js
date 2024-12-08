import Image from "next/image";

export default function notFound() {
  return (
    <section
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={`/error.png`}
        width={400}
        height={400}
        alt="error-404"
        draggable="false"
      />
      <h1 style={{ fontSize: "20px", fontWeight: "500" }}>
        404 • Page not found.
      </h1>
    </section>
  );
}
