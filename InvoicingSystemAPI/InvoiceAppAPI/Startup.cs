using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Text;
using InvoiceAppAPI.Implementation;
using InvoiceAppAPI.Interfaces;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace InvoiceAppAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }
    private byte[] key = Encoding.UTF8.GetBytes(
      "wsdfghjredcuijuiyrfuhljihiu5yryjthoihgytfoiok9ryiuh9876e534xbce-984387g43rsdsdhiuchsdoiunsoifhnsdfmposdmvcxbjvx");
    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      AddInterfacesImplementation(services);
      services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
      services.AddCors();
      services.AddSwaggerGen(c =>
      {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Description =
            "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
          {
            new OpenApiSecurityScheme
            {
              Reference = new OpenApiReference
              {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
              },
              Scheme = "oauth2",
              Name = "Bearer",
              In = ParameterLocation.Header,
            },
            new List<string>()
          }
        });
      });

      services.AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = "JwtBearer";
          options.DefaultChallengeScheme = "JwtBearer";
        })
        .AddJwtBearer("JwtBearer", jwtBearerOptions =>
        {
          jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(5)
          };
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseHttpsRedirection();

      app.UseRouting();


      app.UseAuthentication();
      app.UseAuthorization();
      app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true)
        .AllowCredentials());
      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");

      });
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }

    private void AddInterfacesImplementation(IServiceCollection services)
    {
      services.AddTransient<IProductService, ProductService>();
      services.AddTransient<IInvoiceService, InvoiceService>();
      services.AddTransient<IUserService, UserService>(userService => new UserService(userService.GetRequiredService<IEncryptionService>()));
      services.AddTransient<IEncryptionService, EncryptionService>();
      services.AddTransient<IJWTTokenService, JWTTokenService>(JWTTokenService => new JWTTokenService(key));
      services.AddTransient<IContractorService, ContractorService>();
      services.AddTransient<IPaymentMethodService, PaymentMethodService>();
      services.AddTransient<IFileManagmentService, FileManagmentService>();
      services.AddTransient<ICompanyDataService, CompanyDataService>();
      services.AddTransient<IEmployeesToContractorsService, EmployeesToContractorsService>();
    }
  }
}
