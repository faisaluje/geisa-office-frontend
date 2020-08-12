import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

function MailConfirmation({ username }) {
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32">
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384 rounded-8">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <div className="m-32">
                <Icon className="text-96" color="action">
                  email
                </Icon>
              </div>

              <Typography variant="h5" className="text-center mb-16">
                Lupa Password
              </Typography>

              <Typography className="text-center mb-16 w-full" color="textSecondary">
                password sementara sudah dikirim ke <b>{username}</b>.
              </Typography>

              <Typography className="text-center w-full" color="textSecondary">
                Silahkan buka email yang sudah kami kirimkan, Untuk mendapatkan password sementara.
              </Typography>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-medium" to="/login">
                  Kembali ke Halaman Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default MailConfirmation;
