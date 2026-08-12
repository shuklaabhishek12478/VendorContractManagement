# =========================
# Stage 1 - Restore
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS restore

WORKDIR /src

COPY VendorContractManagement.API/VendorContractManagement.API.csproj VendorContractManagement.API/
COPY VendorContractManagement.Application/VendorContractManagement.Application.csproj VendorContractManagement.Application/
COPY VendorContractManagement.Domain/VendorContractManagement.Domain.csproj VendorContractManagement.Domain/
COPY VendorContractManagement.Infrastructure/VendorContractManagement.Infrastructure.csproj VendorContractManagement.Infrastructure/

RUN dotnet restore VendorContractManagement.API/VendorContractManagement.API.csproj


# =========================
# Stage 2 - Build & Publish
# =========================
FROM restore AS publish

COPY VendorContractManagement.API/ VendorContractManagement.API/
COPY VendorContractManagement.Application/ VendorContractManagement.Application/
COPY VendorContractManagement.Domain/ VendorContractManagement.Domain/
COPY VendorContractManagement.Infrastructure/ VendorContractManagement.Infrastructure/

RUN dotnet publish VendorContractManagement.API/VendorContractManagement.API.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore \
    -p:UseAppHost=false


# =========================
# Stage 3 - Runtime
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=publish /app/publish .

RUN mkdir -p /app/wwwroot/uploads

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "VendorContractManagement.API.dll"]