import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { RecetasModule } from './recetas/recetas.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsuariosModule, CategoriasModule, RecetasModule, IngredientesModule, ComentariosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
