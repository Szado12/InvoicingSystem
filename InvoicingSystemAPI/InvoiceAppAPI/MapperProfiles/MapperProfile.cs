using System;
using System.Linq;
using AutoMapper;
using InvoiceAppAPI.Models;
using InvoiceAppAPI.ViewModel;
using InvoiceAppAPI.ViewModel.EmployeesToContractors;
using InvoiceAppAPI.ViewModel.InvoiceModels;
using InvoiceAppAPI.ViewModel.User;

namespace InvoiceAppAPI.MapperProfiles
{
  public class MapperProfile : Profile
  {
    public MapperProfile()
    {
      CreateMap<Product, ProductViewForList>();
      CreateMap<PaymentMethod, PaymentMethodViewForTypeahead>();
      CreateMap<Contractor, ContractorView>();
      CreateMap<Invoice, InvoiceViewModel>();
      CreateMap<Invoice, InvoiceViewModelFrontend>();
      CreateMap<Product, ProductViewModel>().ForMember(s => s.Name,
        opt => opt.MapFrom(src => src.CurrenVersion ? src.Name : $"{src.Name} zarchiwizowane"));
      CreateMap<Employee, UserData>()
        .ForMember(s => s.Login, opt => opt.MapFrom(src => src.Credential.Login))
        .ForMember(s => s.EmployeeId, opt => opt.MapFrom(src => src.Id)); ;

      CreateMap<InvoiceRow, InvoiceRowViewModel>();
      CreateMap<Invoice, InvoiceListViewModel>()
        .ForMember(s => s.InvoiceContractor,
          opt => opt.MapFrom(src => src.Contractor.CompanyName))
        .ForMember(s => s.CreationDate,
          opt => opt.MapFrom(src => src.CreationDate.ToShortDateString()))
        .ForMember(s => s.PaymentMethod,
          opt => opt.MapFrom(src => src.PaymentMethod.Name))
        .ForMember(s => s.PaymentDate,
          opt => opt.MapFrom(src => src.PaymentDate.ToShortDateString()))
        .ForMember(s => s.ModifyDate,
          opt => opt.MapFrom(src => src.ModifyDate == null ?  "" : src.ModifyDate.Value.ToShortDateString()));

      CreateMap<InvoiceRow, InvoiceRowCalculated>()
        .ForMember(s => s.DiscountedPrice, opt => opt.MapFrom(src => (1 - src.Discount) * src.Product.PriceNetto))
        .ForMember(s => s.SummedNettoValue, opt => opt.MapFrom(src => (1 - src.Discount) * src.Product.PriceNetto * src.NumberOfProducts))
        .ForMember(s => s.SummedVatValue, opt => opt.MapFrom(src => (1 - src.Discount) * src.Product.PriceNetto * src.NumberOfProducts * src.Product.Vat/100))
        .ForMember(s => s.SummedBruttoValue, opt => opt.MapFrom(src => (1 - src.Discount) * src.Product.PriceNetto * src.NumberOfProducts * (1 + (Convert.ToDecimal(src.Product.Vat) / 100))));

      CreateMap<Role, RoleViewModel>();
      CreateMap<Employee, UserModel>();
      CreateMap<CompanyData,CompanyDataViewModel>();
      CreateMap<CompanyDataViewModel,CompanyData>();
      CreateMap<Invoice, InvoicePreviewModel>();
      CreateMap<Employee, EmployeeInfo>()
        .ForMember(s => s.Name, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
        .ForMember(s => s.Id, opt => opt.MapFrom(src => src.Id));
    }
  }
}
