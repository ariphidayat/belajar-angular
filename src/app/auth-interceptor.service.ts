import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Authenticate...")

    const modifiedReq = req.clone({
      headers: req.headers.append('Authentication', 'Bearer TOKEN')
    });

    return next.handle(modifiedReq);
  }
}
