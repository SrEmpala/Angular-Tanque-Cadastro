using APIAngular.Model;
using APIAngular.Repositorios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TankController : ControllerBase
    {
        private readonly ITankRepositorio _tankRepositorio;

        public TankController(ITankRepositorio tankRepositorio)
        {
            _tankRepositorio = tankRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<TankModel>>> BuscarTodosId()
        {
            List<TankModel> tank = await _tankRepositorio.BuscarTodosId();
            return Ok(tank);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<TankModel>>> BuscarPorIdUnico(int id)
        {
            TankModel tank = await _tankRepositorio.BuscarPorIdUnico(id);
            return Ok(tank);
        }

        [HttpPost]
        public async Task<ActionResult<TankModel>> Cadastrar([FromBody] TankModel tankModel)
        {
            TankModel tank = await _tankRepositorio.Adicionar(tankModel);
            return Ok(tank);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TankModel>> Atualizar([FromBody] TankModel tankModel, int id)
        {
            tankModel.Id = id;
            TankModel tank = await _tankRepositorio.Atualizar(tankModel, id);
            return Ok(tank);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TankModel>> Apagar(int id)
        {
            bool apagado = await _tankRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}
