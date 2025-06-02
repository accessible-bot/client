import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { Prisma, PrismaClient } from "@prisma/client";
import { UserType } from './enums/UserType';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name?: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email?: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
  @Matches(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
  @Matches(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
  @Matches(/[\W_]/, { message: 'A senha deve conter pelo menos um caractere especial' })
  password?: string;

  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'A data de nascimento deve estar no formato DD-MM-AAAA',
  })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birthDate?: string;

  @IsEnum(UserType, { message: 'Tipo de usuário inválido' })

  @IsNotEmpty({ message: 'O tipo de usuário é obrigatório' })
  userType?: UserType;
}
