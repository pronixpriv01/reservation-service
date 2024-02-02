import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { _id: userId }: UserDto,
  ) {
    // Dummy-Implementierung für das Zahlungsservice
    const dummyPaymentResponse = { id: 'dummy_payment_id' };

    // Simulieren des zahlungsservice-Aufrufs und Erstellen der Reservierung
    return this.handlePaymentResponse(
      dummyPaymentResponse,
      createReservationDto,
      userId,
    );
  }

  // dummy
  private async handlePaymentResponse(
    paymentResponse: any,
    createReservationDto: CreateReservationDto,
    userId: string,
  ) {
    return this.reservationsRepository.create({
      _id: undefined,
      ...createReservationDto,
      invoiceId: paymentResponse.id,
      timestamp: new Date(),
      userId,
    });
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
