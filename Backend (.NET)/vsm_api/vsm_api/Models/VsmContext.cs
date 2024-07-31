using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace vsm_api.Models;

public partial class VsmContext : DbContext
{
    public VsmContext()
    {
    }

    public VsmContext(DbContextOptions<VsmContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BillOfMaterial> BillOfMaterials { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<ServiceAdvisor> ServiceAdvisors { get; set; }

    public virtual DbSet<ServiceRecord> ServiceRecords { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    public virtual DbSet<WorkItem> WorkItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BillOfMaterial>(entity =>
        {
            entity.HasKey(e => e.BillOfMaterialID).HasName("PK__BillOfMa__A029ECF6533BC969");

            entity.ToTable("BillOfMaterial");

            entity.Property(e => e.BillOfMaterialID)
                .ValueGeneratedNever()
                .HasColumnName("billOfMaterialID");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.ServiceRecordID).HasColumnName("serviceRecordID");

         /*   entity.HasOne(d => d.ServiceRecord).WithMany(p => p.BillOfMaterials)
                .HasForeignKey(d => d.ServiceRecordId)
                .HasConstraintName("FK__BillOfMat__servi__59063A47");*/
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerID).HasName("PK__Customer__B611CB9DDC5EC444");

            entity.ToTable("Customer");

            entity.Property(e => e.CustomerID)
                .ValueGeneratedNever()
                .HasColumnName("customerID");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PK__Login__CBA1B257AFEF112B");

            entity.ToTable("Login");

            entity.Property(e => e.Userid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("userid");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        modelBuilder.Entity<ServiceAdvisor>(entity =>
        {
            entity.HasKey(e => e.ServiceAdvisorID).HasName("PK__ServiceA__377EBAFABB302890");

            entity.ToTable("ServiceAdvisor");

            entity.Property(e => e.ServiceAdvisorID)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("serviceAdvisorID");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<ServiceRecord>(entity =>
        {
            entity.HasKey(e => e.ServiceRecordID).HasName("PK__ServiceR__8B90D445FF781569");

            entity.ToTable("ServiceRecord");

            entity.Property(e => e.ServiceRecordID)
                .ValueGeneratedNever()
                .HasColumnName("serviceRecordID");
            entity.Property(e => e.ServiceAdvisorID)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("serviceAdvisorID");
            entity.Property(e => e.ServiceDate).HasColumnName("serviceDate");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.VehicleID).HasColumnName("vehicleID");

         /*   entity.HasOne(d => d.ServiceAdvisor).WithMany(p => p.ServiceRecords)
                .HasForeignKey(d => d.ServiceAdvisorId)
                .HasConstraintName("FK__ServiceRe__servi__534D60F1");*/

          /*  entity.HasOne(d => d.Vehicle).WithMany(p => p.ServiceRecords)
                .HasForeignKey(d => d.VehicleId)
                .HasConstraintName("FK__ServiceRe__vehic__52593CB8");*/
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.VehicleID).HasName("PK__Vehicle__5B9D25D24CE0C182");

            entity.ToTable("Vehicle");

            entity.Property(e => e.VehicleID)
                .ValueGeneratedNever()
                .HasColumnName("vehicleID");
            entity.Property(e => e.Company)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("company");
            entity.Property(e => e.CustomerID).HasColumnName("customerID");
            entity.Property(e => e.Model)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("model");
            entity.Property(e => e.ServiceDueDate).HasColumnName("serviceDueDate");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.Vin)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("vin");
            entity.Property(e => e.Year).HasColumnName("year");

          /*  entity.HasOne(d => d.Customer).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.CustomerID)
                .HasConstraintName("FK__Vehicle__custome__4F7CD00D");*/
        });

        modelBuilder.Entity<WorkItem>(entity =>
        {
            entity.HasKey(e => e.WorkItemID).HasName("PK__WorkItem__836B1212B4B425EF");

            entity.ToTable("WorkItem");

            entity.Property(e => e.WorkItemID)
                .ValueGeneratedNever()
                .HasColumnName("workItemID");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.ItemName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("itemName");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.ServiceRecordID).HasColumnName("serviceRecordID");

           /* entity.HasOne(d => d.ServiceRecord).WithMany(p => p.WorkItems)
                .HasForeignKey(d => d.ServiceRecordId)
                .HasConstraintName("FK__WorkItem__servic__5629CD9C");*/
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
