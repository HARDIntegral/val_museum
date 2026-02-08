use actix_files::{Files, NamedFile};
use actix_web::{get, App, HttpServer, Result};

#[get("/")]
async fn index() -> Result<NamedFile> {
    Ok(NamedFile::open("./static/index.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Museum running at http://127.0.0.1:8080");

    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(Files::new("/static", "./static"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
