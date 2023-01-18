using APIAngular.Data;
using APIAngular.Model;
using APIAngular.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIAngular.Repositorios
{
    public class TankRepositorio : ITankRepositorio
    {
        private readonly TankContext _dbContext;

        public TankRepositorio(TankContext tankContext) { 
            _dbContext = tankContext;
        }

        public async Task<TankModel> BuscarPorIdUnico(int id)
        {
            return await _dbContext.Tank.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<TankModel>> BuscarTodosId()
        {
            return await _dbContext.Tank.ToListAsync();
        }

        public async Task<TankModel> Adicionar(TankModel tank)
        {
            await _dbContext.Tank.AddAsync(tank);
            await _dbContext.SaveChangesAsync();

            return tank;
        }

        public async Task<TankModel> Atualizar(TankModel tank, int id)
        {
            TankModel tankPorId = await BuscarPorIdUnico(id);

            if(tankPorId == null)
            {
                throw new Exception("Este Tanque não foi encontrado no banco de dados.");
            }
            tankPorId.Nome = tank.Nome;
            tankPorId.Modelo = tank.Modelo;
            tankPorId.Nacao = tank.Nacao;

            _dbContext.Tank.Update(tankPorId);
            await _dbContext.SaveChangesAsync();

            return tankPorId;
        }

        public async Task<bool> Apagar(int id)
        {
            TankModel tankPorId = await BuscarPorIdUnico(id);

            if(tankPorId == null)
            {
                throw new Exception("Este Tanque não foi encontrado no banco de dados");
            }
            _dbContext.Remove(tankPorId);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
