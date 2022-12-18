using NUnit.Framework;
using InternetPlatformOfArtist.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.InMemory;
using InternetPlatformOfArtist.Models;
using InternetPlatformOfArtist.Controllers;
using InternetPlatformOfArtist.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace TestInternetPlatform
{
    [TestFixture]
    public class TestCompetitionsController
    {
        private CompetitionsController competitionController;
        private RepositoryCompetition repository;

        public static DbContextOptions<ArtContext> contextOptions = new DbContextOptionsBuilder<ArtContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        ArtContext context;

        [OneTimeSetUp]
        public void Setup()
        {
            context = new ArtContext(contextOptions);

            context.Database.EnsureCreated();
            GetDatabase();

            repository = new RepositoryCompetition(context);
            competitionController = new CompetitionsController(repository);

        }

        [OneTimeTearDown]
        public void End()
        {
            context.Database.EnsureDeleted();
        }

        [Test]
        public async Task TestGetAllCompetititons()
        {
            var result = await competitionController.GetAllCompetition();
            Assert.NotNull(result);
            Assert.IsInstanceOf<object>(result);

        }

        [Test]
        public async Task TestGetCompetititonById_ReturnOk()
        {
            int id = 1000;
            var result = await competitionController.GetCompetitionById(id) as OkObjectResult;
            Assert.NotNull(result.Value);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task TestGetCompetititonById_ReturnNotFound()
        {
            int id = 100;
            var result = await competitionController.GetCompetitionById(id) as NotFoundResult;
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task TestAddCompetition()
        {
            Competition addcompetition = new Competition()
            {
                IdCompetition = 1003,
                IdUser = 120,
                NameCompetition = "Весна",
                DescriptionCompetition = "Приглашаем на наш конкурс Весна",
                DateStart = DateTime.Today,
                DateFinish = DateTime.Today.AddDays(3),
                CityCompetition = "Казань",
                Img = null,
                IdStatusCompetition = 2
            };
            var result = await repository.AddCompetition(addcompetition);
            Assert.NotNull(result);
            Assert.IsInstanceOf<Competition>(result);
            Assert.AreEqual(addcompetition, result);
        }

        [Test]
        public async Task TestChangeCompetition()
        {
            int id = 1004;
            var changecompetition = new Competition()
            {
                IdCompetition = 1004,
                IdUser = 120,
                NameCompetition = "Весна",
                DescriptionCompetition = "Приглашаем на наш конкурс Весна",
                DateStart = DateTime.Today,
                DateFinish = DateTime.Today.AddDays(3),
                CityCompetition = "Казань",
                Img = null,
                IdStatusCompetition = 2
            };
            string expected = "Танцуй и пой";
            await competitionController.AddCompetition(changecompetition);
            changecompetition.NameCompetition = expected;
            var result = await repository.ChangeCompetition(id, changecompetition);
            Assert.NotNull(result);
            Assert.IsInstanceOf<Competition>(result);
            Assert.AreEqual(changecompetition, result);
        }

        [Test]
        public async Task TestChangeCompetition_Return_BadRequest()
        {
            int id = 1004;
            var changecompetition = new Competition()
            {
                IdCompetition = 1005,
                IdUser = 120,
                NameCompetition = "Весна",
                DescriptionCompetition = "Приглашаем на наш конкурс Весна",
                DateStart = DateTime.Today,
                DateFinish = DateTime.Today.AddDays(3),
                CityCompetition = "Казань",
                Img = null,
                IdStatusCompetition = 2
            };
            string expected = "Танцуй и пой";
            await competitionController.AddCompetition(changecompetition);
            changecompetition.NameCompetition = expected;
            var result = await competitionController.ChangeCompetition(id, changecompetition) as ActionResult<Competition>;
            Assert.NotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result.Result);
        }

        [Test]
        public async Task TestGetCompetitionByCity()
        {
            string expectedCity = "Владимир";
            var result = await competitionController.GetCompetitionByCity(expectedCity) as ActionResult;
            Assert.NotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task TestGetCompetitionByCity_Return_Empty()
        {
            string expectedCity = "UUUUU";
            var result = await competitionController.GetCompetitionByCity(expectedCity) as OkObjectResult;
            var results = result.Value as IEnumerable;
            Assert.IsEmpty(results);
        }

        [Test]
        public async Task TestCancelCompetition()
        {
            int id = 1001;
            var result = await repository.CancelCompetition(id);
            Assert.NotNull(result);
            Assert.IsInstanceOf<Competition>(result);
            Assert.AreEqual(result.IdStatusCompetition, 4);
        }

        private void GetDatabase()
        {
            var user = new User("Saulova", "Ann", "Mihlaovna", "annSaulova", "annqwerty1234!", "annutohkalilia@gmail.com", "88005553535", 2);
            user.IdUser = 120;
            context.User.Add(user);

            var status = new StatusCompetition()
            {
                IdStatusCompetition = 2,
                NameStatus = "Проводится"
            };
            context.StatusCompetition.Add(status);

            var competitions = new List<Competition>
            {
                new Competition()
                {
                    IdCompetition = 1000,
                    IdUser = 120,
                    NameCompetition = "Синий лён",
                    DescriptionCompetition = "Приглашаем на наш конкурс Синий лён",
                    DateStart = DateTime.Today,
                    DateFinish = DateTime.Today.AddDays(5),
                    CityCompetition = "Владимир",
                    Img = null,
                    IdStatusCompetition = 2
                },
                new Competition()
                {
                    IdCompetition = 1001,
                    IdUser = 120,
                    NameCompetition = "Вдохновение",
                    DescriptionCompetition = "Приглашаем на наш конкурс Вдохновение",
                    DateStart = DateTime.Today,
                    DateFinish = DateTime.Today.AddDays(6),
                    CityCompetition = "Владимир",
                    Img = null,
                    IdStatusCompetition = 2
                }
            };
            context.Competition.AddRange(competitions);

            context.SaveChanges();
        }
    }
}
