use actix_files::{Files, NamedFile};
use actix_web::{web, App, HttpServer, Result};

async fn fallback() -> Result<NamedFile> {
    Ok(NamedFile::open("./static/index.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = std::env::var("PORT").unwrap_or_else(|_| "10000".to_string());
    let bind_addr = format!("0.0.0.0:{}", port);

    println!("Listening on http://{}", bind_addr);

    HttpServer::new(|| {
        App::new()
            // Serve your static site at root
            .service(Files::new("/", "./static").index_file("index.html"))
            // Anything else -> index.html (SPA-style fallback)
            .default_service(web::get().to(fallback))
    })
    .bind(bind_addr)?
    .run()
    .await
}
