import { AuthRepository } from './auth.repository';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../app/shared.module';
import { AuthDto } from './auth.dto';
import { of } from 'rxjs';
import { UserAuthDto } from '../../../app/features/User/user-auth.dto';

describe('Auth Repository', () => {

    let repository: AuthRepository;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            providers: [
                AuthRepository
            ]
        });
        repository = TestBed.inject(AuthRepository);
        httpClient = TestBed.inject(HttpClient);
    });


    it('should sign in', () => {
        const authDto = new AuthDto();
        const dto = new UserAuthDto();
        authDto.role = '';
        authDto.token = '';
        spyOn(httpClient, 'post').and.returnValue(of(authDto));

        repository.signIn(dto)
            .subscribe(data => {
                expect(data.token).toBeInstanceOf(String);
                expect(data.role).toBeInstanceOf(String);
                expect(data).toBeInstanceOf(AuthDto);
            });
    });
});
