import { Resend } from 'resend';

const resend = new Resend('re_DNzRvmqX_GsSvHc82c9B5zoCknGhpakdD');

export const useSendEmail = async(req, res, next) => {
    try {
        const { email, totalPrice, updatedTickets, name } = req.body;
        console.log("name: "+name);
        console.log("email: "+email);
        console.log("totalPrice: "+JSON.stringify(totalPrice));
        console.log("updatedTickets: "+JSON.stringify(updatedTickets));

        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Билети за избраното от Вас събитие",
            html: generateEmailHTML(name, updatedTickets, totalPrice)
          });
      } catch (err) {
        next(err);
        console.log("error:"+err);
      }
  }

  function generateEmailHTML(name, ticketsArray, totalPrice) {
    const ticketsList = ticketsArray.map(ticket => `<li><b>${ticket._id}</b></li>`).join('');

    return `
        <div class="success-container">
            <div class="success-icon">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                width="100px"
                height="100px"
                >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 16.2l-4.8-4.6-2.7 2.7L9 21 21 9l-2.7-2.7-6.3 6.3-2.7-2.8z" />
                </svg>
            </div>
            <div class="success-message">
                <h2>Браво ${name}!</h2>
                <p>Вие успешно заявихте вашите билети за взeмане от билетен център!<br><br>
                Можете да вземете своите билети в срок до 1 седмица преди събитието! <br><br>
                За да бъдете верифицирани на място на касите ни, ще трябва да цитирате следните номера: </p>
                <ul class="ordered-tickets-list">
                    ${ticketsList}
                </ul>
                <h3><i>Общата стойност, която е необходимо да заплатите за Вашите билети е: </i><b>${totalPrice} лв.</b></h3>
            </div>
        </div>`;
}
