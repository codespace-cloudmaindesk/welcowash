FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/WelcoWash.Web.Host/WelcoWash.Web.Host.csproj", "src/WelcoWash.Web.Host/"]
COPY ["src/WelcoWash.Web.Core/WelcoWash.Web.Core.csproj", "src/WelcoWash.Web.Core/"]
COPY ["src/WelcoWash.Application/WelcoWash.Application.csproj", "src/WelcoWash.Application/"]
COPY ["src/WelcoWash.Core/WelcoWash.Core.csproj", "src/WelcoWash.Core/"]
COPY ["src/WelcoWash.EntityFrameworkCore/WelcoWash.EntityFrameworkCore.csproj", "src/WelcoWash.EntityFrameworkCore/"]
WORKDIR "/src/src/WelcoWash.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/WelcoWash.Web.Host", "src/WelcoWash.Web.Host"]
COPY ["src/WelcoWash.Web.Core", "src/WelcoWash.Web.Core"]
COPY ["src/WelcoWash.Application", "src/WelcoWash.Application"]
COPY ["src/WelcoWash.Core", "src/WelcoWash.Core"]
COPY ["src/WelcoWash.EntityFrameworkCore", "src/WelcoWash.EntityFrameworkCore"]
WORKDIR "/src/src/WelcoWash.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "WelcoWash.Web.Host.dll"]
