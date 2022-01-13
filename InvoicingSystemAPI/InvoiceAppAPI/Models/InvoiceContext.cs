using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace InvoiceAppAPI.Models
{
    public partial class InvoiceContext : DbContext
    {
        public InvoiceContext()
        {
        }

        public InvoiceContext(DbContextOptions<InvoiceContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CompanyData> CompanyData { get; set; }
        public virtual DbSet<Contractor> Contractors { get; set; }
        public virtual DbSet<Credential> Credentials { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeesContractor> EmployeesContractors { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceRow> InvoiceRows { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-SVEB21G;Database=InvoiceDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Polish_CI_AS");

            modelBuilder.Entity<CompanyData>(entity =>
            {
                entity.Property(e => e.AccountNumber)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.BankName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Nip)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("NIP");

                entity.Property(e => e.ZipCode)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Contractor>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Nip)
                    .IsRequired()
                    .HasMaxLength(11)
                    .HasColumnName("NIP");

                entity.Property(e => e.ZipCode)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.RootContractor)
                    .WithMany(p => p.InverseRootContractor)
                    .HasForeignKey(d => d.RootContractorId)
                    .HasConstraintName("FK_Contractors_Contractors");
            });

            modelBuilder.Entity<Credential>(entity =>
            {
                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Credential)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.CredentialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Employees_Logins");

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.InverseManager)
                    .HasForeignKey(d => d.ManagerId)
                    .HasConstraintName("FK_Employees_Employees");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Employees_Roles");
            });

            modelBuilder.Entity<EmployeesContractor>(entity =>
            {
                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeesContractors)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmployeesContractors_Employees");

                entity.HasOne(d => d.RootContractor)
                    .WithMany(p => p.EmployeesContractors)
                    .HasForeignKey(d => d.RootContractorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EmployeesContractors_Contractors");
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.InvoiceNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.ModifyDate).HasColumnType("date");

                entity.Property(e => e.PaymentDate).HasColumnType("date");

                entity.HasOne(d => d.CompanyData)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.CompanyDataId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoices_CompanyData");

                entity.HasOne(d => d.Contractor)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.ContractorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoices_Contractors");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoices_Employees");

                entity.HasOne(d => d.PaymentMethod)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.PaymentMethodId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoices_PaymentMethods");
            });

            modelBuilder.Entity<InvoiceRow>(entity =>
            {
                entity.Property(e => e.Discount).HasColumnType("decimal(2, 2)");

                entity.Property(e => e.NumberOfProducts).HasColumnType("decimal(6, 4)");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.InvoiceRows)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_InvoiceRows_Invoices");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.InvoiceRows)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InvoiceRows_Products");
            });

            modelBuilder.Entity<PaymentMethod>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.CatalogNumber)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.MeasurementUnits)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.PriceNetto).HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
