using AutoMapper;
using InvoiceAppAPI.MapperProfiles;
using InvoiceAppAPI.Models;

namespace InvoiceAppAPI.Implementation
{
  public class DefaultService
  {
    public readonly InvoiceContext InvoiceContext = new InvoiceContext();
    private static readonly MapperConfiguration MapperConfig = new MapperConfiguration(cfg => cfg.AddProfile(new MapperProfile()));
    protected IMapper Mapper = MapperConfig.CreateMapper();
  }
}
