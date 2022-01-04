
 class BookController {
   async create(req, h) {
    try {
      const id = encodeURIComponent(req.params.id);
      req.payload.parent = id;
      let bookServices = new BookServices(Tenant.connectTenant(req.tenant));
      const entity = await bookServices.create(req.payload);
      return entity;
    } catch (error) {
      return h.error(error);
    }
  }
}